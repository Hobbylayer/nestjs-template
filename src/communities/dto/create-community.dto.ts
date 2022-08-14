import { Types } from "mongoose";

export class CreateCommunityDto {
    name: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    rif: string;
    exchangeRate: number;
    currency: string;
    owner: Types.ObjectId;
}
