import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { UserStatus } from "src/users/enums/users.enums";
import { JwtPayload } from "../interfaces/jw-payload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name)
        readonly userModel: Model<User>
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }


    async validate(payload: JwtPayload): Promise<User> {
        const { _id } = payload

        const user = await this.userModel.findById(_id, null, { status: UserStatus.ACTIVE })
        if (!user) throw new UnauthorizedException('Token not valid')

        return user
    }
}