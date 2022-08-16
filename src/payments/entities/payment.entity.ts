import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { KindPayment, PaymentStatus } from '../enums/enums.payments';

@Schema({ timestamps: true })
export class Payment extends Document {


    @Prop({ type: Date, required: true })
    date: string;

    @Prop({ type: String, required: true })
    number: string;

    @Prop({ type: String, default: KindPayment.INCOME, enum: KindPayment })
    kind: KindPayment;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    resident: Types.ObjectId;

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

    @Prop({ type: Types.ObjectId, ref: 'Community', required: true })
    community: Types.ObjectId;

    @Prop()
    residenceNumber: string;

    @Prop()
    concept: string;
}


export const PaymetnsSchema = SchemaFactory.createForClass(Payment);