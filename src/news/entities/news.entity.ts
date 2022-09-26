

import { Document, Types } from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { STATUS_DOCUMENT } from 'src/common/enums/common.enums';

@Schema({ timestamps: true })
export class New extends Document {

    @Prop({ enum: STATUS_DOCUMENT, default: STATUS_DOCUMENT.ACTIVE })
    status: STATUS_DOCUMENT;

    @Prop({ required: true })
    title: string;

    @Prop({ type: String })
    description: string

    @Prop({ required: true, ref: 'Community' })
    community: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: string;

    @Prop({ type: Types.Array<Types.ObjectId>, ref: 'User' })
    likes: Types.ObjectId[]

    @Prop({ type: Types.Array<Types.ObjectId>, ref: 'User' })
    dislike: Types.ObjectId[]

    //TODO add comments feature
}


export const NewSchema = SchemaFactory.createForClass(New);