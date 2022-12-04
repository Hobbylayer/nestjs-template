import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'payments_requests',
})
export class PaymentsRequest extends Document {
  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  concept: string;

  @Prop({ type: Types.ObjectId, required: true, index: true })
  community: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  createBy: string;

  @Prop({ type: Types.ObjectId })
  updatedBy: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, default: 'USD' })
  currency: string;

  @Prop({ type: String })
  mainCurrencyAmount: number;

  @Prop({ type: String, default: 'open' })
  status: string;

  @Prop({ type: Types.Array<Types.ObjectId>, ref: 'Location' })
  debts: Types.ObjectId[];

  @Prop({
    type: [
      {
        payment: { type: Types.ObjectId, ref: 'Payment' },
        location: { type: Types.ObjectId, ref: 'Location' },
      },
    ],
  })
  payments: { id: string; location: string }[];
}

export const PaymentsRequestSchema =
  SchemaFactory.createForClass(PaymentsRequest);
