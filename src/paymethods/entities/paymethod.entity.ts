import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { STATUS_DOCUMENT } from 'src/common/enums/common.enums'


@Schema({
    timestamps: true,
})
export class Paymethod extends Document {

    @Prop({ type: String, required: true })
    readonly name: string

    @Prop({ type: Types.ObjectId, required: true, index: true })
    readonly community: string

    @Prop({ type: String, required: true })
    readonly description: string

    @Prop({ type: STATUS_DOCUMENT, required: false })
    readonly status?: STATUS_DOCUMENT

    @Prop({ type: Types.ObjectId, required: false, ref: 'User' })
    readonly createdBy?: string

    @Prop({ type: Types.ObjectId, required: false, ref: 'User' })
    readonly updatedBy?: string


}


export const PaymentsRequestSchema = SchemaFactory.createForClass(Paymethod)