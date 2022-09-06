import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BANK_ACCOUNT_KIND } from "../enums/banks.enums";
import { STATUS_DOCUMENT } from "src/common/enums/common.enums";

@Schema({ timestamps: true })
export class Bank extends Document {

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, enum: BANK_ACCOUNT_KIND, required: true })
    kind: BANK_ACCOUNT_KIND

    @Prop({ type: String })
    number: string

    @Prop({ type: String, default: "USD" })
    currency: string

    @Prop({ type: String })
    balance: string

    @Prop({ type: Types.ObjectId, required: true })
    community: Types.ObjectId

    @Prop({ type: String, default: STATUS_DOCUMENT.ACTIVE, enum: STATUS_DOCUMENT })
    status: string
}



export const BanksSchema = SchemaFactory.createForClass(Bank);