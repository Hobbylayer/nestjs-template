import { IsDate, IsEnum, IsInt, IsMongoId, IsOptional, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";
import { KindPayment, Paymethod } from "../enums/enums.payments";

export class CreatePaymentDto {

    @IsDate()
    date: string;

    @IsEnum(KindPayment)
    kind: KindPayment;

    @IsEnum(Paymethod)
    paymethod: Paymethod;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    description: string;

    @IsMongoId()
    createdBy: Types.ObjectId;

    @IsMongoId()
    client: Types.ObjectId;

    @IsMongoId()
    @IsOptional()
    bank: string;

    @IsString()
    @IsOptional()
    currency: string;

    @IsInt()
    amount: number;

    @IsString()
    @IsOptional()
    referenceCode: string;

    @IsString()
    @IsOptional()
    paymethodName: string;

    @IsMongoId()
    community: Types.ObjectId;

    @IsString()
    @IsOptional()
    concept: string;
}
