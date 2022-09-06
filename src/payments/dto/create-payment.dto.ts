import {
    IsEnum,
    IsISO8601,
    IsMongoId,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength
} from "class-validator";
import { Types } from "mongoose";
import { PaymentConcept } from "src/common/enums/common.enums";
import { KindPayment, PaymentStatus, Paymethod } from "../enums/enums.payments";

export class CreatePaymentDto {

    @IsISO8601()
    date: string;

    @IsEnum(KindPayment)
    @IsOptional()
    kind: KindPayment;

    @IsEnum(Paymethod)
    paymethod: Paymethod;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    description: string;

    @IsMongoId()
    resident: Types.ObjectId;

    @IsMongoId()
    location: Types.ObjectId

    @IsMongoId()
    @IsOptional()
    bank: string;

    @IsString()
    @IsOptional()
    currency: string;

    @IsPositive()
    amount: number;

    @IsString()
    @IsOptional()
    referenceCode: string;

    @IsMongoId()
    community: Types.ObjectId;

    @IsMongoId()
    paymentRequest: string

    @IsEnum(PaymentConcept)
    @IsString()
    @IsOptional()
    concept: PaymentConcept;

    @IsEnum(PaymentStatus)
    @IsString()
    @IsOptional()
    status: PaymentStatus.APPROVED | PaymentStatus.PENDING | PaymentStatus.VOID
}
