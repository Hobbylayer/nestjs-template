import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class CommonArea extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Types.ObjectId })
  community: Types.ObjectId;
}

export const CommonAreaSchema = SchemaFactory.createForClass(CommonArea);
