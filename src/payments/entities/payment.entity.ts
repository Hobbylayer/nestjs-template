import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { KindPayment, PaymentStatus, Paymethod } from '../enums/enums.payments';

@Schema({ timestamps: true })
export class Payment extends Document {


    @Prop({ type: Date, required: true })
    date: string;

    @Prop({ type: String, required: true })
    code: string;

    @Prop({ type: String, default: KindPayment.INCOME, enum: KindPayment })
    kind: KindPayment;

    @Prop({ type: String, default: Paymethod.CASH, enum: Paymethod })
    paymethod: Paymethod;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    client: Types.ObjectId;

    @Prop({ type: Types.ObjectId })
    bank: Types.ObjectId;

    @Prop({ type: String, default: 'USD' })
    currency: string;

    @Prop({ type: Number })
    amount: number;

    @Prop({ type: String })
    referenceCode: string;

    @Prop({ type: String })
    paymethodName: string;

    @Prop({ type: String, enum: PaymentStatus })
    status: PaymentStatus

    @Prop({ type: Types.ObjectId, ref: 'Community', required: true })
    community: Types.ObjectId;

    @Prop()
    concept: string;
}


export const PaymetnsSchema = SchemaFactory.createForClass(Payment);