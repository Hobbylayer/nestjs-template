import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model, PipelineStage } from 'mongoose';
import { PaymentsRequest } from '../payments-requests/entities/payments-request.entity'
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DebtorsService {
  /**
   * Construct all the service. Also, inject all the models.
   * Executes `super()`
   */
  constructor(
    @InjectModel(PaymentsRequest.name)
    private readonly paymentsRequestModel: Model<PaymentsRequest>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }

  /**
   * Find debtors by a community id.
   *
   * @author Gabriel Guerra - @AlphaTechnolog [https://github.com/AlphaTechnolog]
   * @date 10/09/22 18:57
   * @param {Types.ObjectId} communityId: The community id that should be queried to get debtors.
   * @param {PaginationDto} paginationDto: Just the parameters to make the pagination, like: limit, page, sort...
   * @returns {Promise<any>}
   */
  async findByCommunity(communityId: Types.ObjectId, paginationDto: PaginationDto) {

    const { sort = 'ASC', limit = 10, page = 1 } = paginationDto;

    const query: PipelineStage[] = [
      // querying by communityId
      {
        $match: {
          community: communityId,
        },
      },
      // then, replacing the root for some struct that just have the debts in the root
      {
        $replaceRoot: {
          newRoot: {
            value: {
              $map: {
                input: "$debts",
                as: "debt",
                in: {
                  id: "$$debt",
                  amount: "$amount",
                  kindDebt: "$concept"
                }
              }
            }
          }
        }
      },
      // getting the first index of the debts
      {
        $unwind: "$value"
      },
      // replace the root to the first index of the debts, that's for make the next
      // operations more easly.
      {
        $replaceRoot: {
          newRoot: "$value"
        }
      },
      // group data by id and kindDebt, and make a reduce for the mount that just sums
      // all the amounts in the struct.
      {
        $group: {
          _id: {
            id: "$id",
            kindDebt: "$kindDebt",
          },
          amount: {
            $sum: "$amount"
          }
        }
      },
      // remake the structure of the fields.
      {
        $project: {
          _id: 0,
          location: "$_id.id",
          kindDebt: "$_id.kindDebt",
          mainCurrencyAmount: "$amount"
        }
      },
      // make a relation to locations to get the complete location object.
      {
        $lookup: {
          from: 'locations',
          localField: 'location',
          foreignField: '_id',
          as: 'location',
        },
      },
      // fetch the first element of the queried location.
      {
        $unwind: "$location"
      },
      // sort by mainCurrencyAmount
      {
        $sort: {
          // ascendent by default.
          mainCurrencyAmount: sort === 'ASC' ? 1 : -1,
        },
      },
    ];

    // pagination stage.
    const paginationStage: PipelineStage[] = [
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    // starting the first query statement.
    let result = await this.paymentsRequestModel
      .aggregate([...query, ...paginationStage])
      .exec(); // Just executes the whole query.

    // calc total of documents.
    const totalDocs: number = (await this.paymentsRequestModel.aggregate(query).exec()).length;

    // calc total of pages.
    let totalPages: number = Math.trunc(totalDocs / limit);
    if (totalDocs % limit > 0)
      totalPages++;

    // merge the users in the base result.
    // TODO: This shouldn't be here, the relation should be between locations and users, not users to locations.
    // A user, could have more than just one location, so for now, i'll manually add the users, but in the future
    // this will be removed, because that will be made with $lookup instead of a simple js map.
    result = await Promise.all(result.map(async (item) => ({
      ...item,
      resident: await this.userModel.findOne({ location: item.location._id.toString() })
    })))

    // reformat the response.
    return {
      docs: result,
      totalDocs,
      totalPages,
      limit: limit,
      page: page,
    }
  }
}
