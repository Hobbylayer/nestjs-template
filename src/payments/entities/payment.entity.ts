import { Document, Types } from 'mongoose'
import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose'
import { KindPayment, PaymentStatus, Paymethod } from '../enums/enums.payments';
import { PaymentConcept } from 'src/common/enums/common.enums';

@Schema({ timestamps: true })
export class Payment extends Document {

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: String, required: true })
    number: string;

    @Prop({
        type: String,
        default: KindPayment.INCOME,
        enum: KindPayment
    })
    kind: KindPayment;

    @Prop({
        type: String,
        default: Paymethod.CASH,
        enum: Paymethod
    })
    paymethod: Paymethod

    @Prop({ type: String })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    resident: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Location' })
    location: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Bank' })
    bank: Types.ObjectId;

    @Prop({ type: String, default: 'USD' })
    currency: string;

    @Prop({ type: Number })
    amount: number;

    @Prop({ type: String })
    referenceCode: string;

    @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
    status: PaymentStatus

    @Prop({ type: Types.ObjectId, required: true })
    community: Types.ObjectId;

    @Prop({ type: Types.ObjectId })
    paymentRequest: Types.ObjectId;


    @Prop({
        required: true,
        enum: PaymentConcept,
        default: PaymentConcept.MONTHLY_PAYMENT
    })
    concept: PaymentConcept;

    @Prop({
        type: Number
    })
    exchangeRate: Number

    @Prop({
        type: String
    })
    mainCurrencyAmount: string

    @Prop({
        type: Types.ObjectId,
        ref: 'User'
    })
    createdBy: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'User'
    })
    updatedBy: Types.ObjectId
}


export const PaymentsSchema = SchemaFactory.createForClass(Payment);