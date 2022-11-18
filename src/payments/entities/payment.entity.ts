import { Document, Types, Date } from 'mongoose'
import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose'
import { KindPayment, PaymentStatus, Paymethod } from '../enums/enums.payments';
import { PaymentConcept } from 'src/common/enums/common.enums';

@Schema({ timestamps: true })
export class Payment extends Document {

    @Prop({ type: String, required: true })
    date: string;

    @Prop({ type: String, required: true, index: true })
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

    @Prop({ type: Types.ObjectId, ref: 'User', required: false }) // required only income payment
    resident?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Contact', required: false }) // required only expense payment
    contact?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Location', required: false }) // required only income payment
    location?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Bank', required: false }) // required only income payment
    bank: Types.ObjectId;

    @Prop({ type: String, default: 'USD' })
    currency: string;

    @Prop({ type: Number })
    amount: number;

    @Prop({ type: String })
    referenceCode: string;

    @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
    status: PaymentStatus

    @Prop({ type: Types.ObjectId, required: true, index: true })
    community: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: false }) // required only income payment
    paymentRequest?: Types.ObjectId;

    @Prop({
        required: true,
        enum: PaymentConcept,
    })
    concept: PaymentConcept;

    @Prop({
        type: Number
    })
    exchangeRate: Types.Decimal128

    @Prop({
        type: String
    })
    mainCurrencyAmount: string

    @Prop({
        type: String,
        required: false
    })
    comments?: string

    @Prop({
        type: Types.ObjectId,
        ref: 'User'
    })
    createdBy?: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'User'
    })
    updatedBy?: Types.ObjectId
}


export const PaymentsSchema = SchemaFactory.createForClass(Payment);
