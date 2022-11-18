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
import { KindPayment as PaymentKind, PaymentStatus, Paymethod } from "../enums/enums.payments";

export class CreatePaymentDto {

    @IsISO8601()
    readonly date: string;

    @IsEnum(PaymentKind)
    readonly kind: PaymentKind;

    @IsEnum(Paymethod)
    readonly paymethod: Paymethod;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    readonly description: string;

    @IsMongoId()
    @IsOptional()
    readonly resident?: Types.ObjectId;

    @IsMongoId()
    @IsOptional()
    readonly contact?: Types.ObjectId;

    @IsMongoId()
    readonly location?: Types.ObjectId

    @IsMongoId()
		@IsOptional()
    readonly bank: string;

    @IsString()
    @IsOptional()
    readonly currency: string;

    @IsPositive()
    readonly amount: number;

    @IsString()
    @IsOptional()
    readonly referenceCode?: string;

    @IsMongoId()
    readonly community: Types.ObjectId;

    @IsMongoId()
    @IsOptional()
    readonly paymentRequest?: string

    @IsEnum(PaymentConcept)
    @IsString()
    readonly concept: PaymentConcept;

    @IsEnum(PaymentStatus)
    @IsString()
    @IsOptional()
    readonly status: PaymentStatus
}
