import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class PaymentsRequest extends Document {

    @Prop({ type: String })
    description: string

    @Prop({ type: String })
    concept: string

    @Prop({ type: Types.ObjectId, required: true })
    community: Types.ObjectId

    @Prop({ type: Types.ObjectId })
    createBy: string

    @Prop({ type: Types.ObjectId })
    updatedBy: string

    @Prop({ type: Number, required: true },)
    amount: number

    @Prop({ type: String, default: 'USD' })
    currency: string

    @Prop({ type: String, default: 'open' })
    status: string
}


export const PaymentsRequestSchema = SchemaFactory.createForClass(PaymentsRequest) 