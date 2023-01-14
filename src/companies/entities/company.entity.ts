import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Company extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: String, unique: true })
  rif: string;

  @Prop({ default: 1 })
  exchangeRate: number;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop({ type: Boolean, default: true })
  isMultiCurrency: boolean;

  @Prop({ required: true })
  owner: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ type: String, required: true })
  code: string;
  //TODO add createdBy and updatedBy
}

export const CompanySchema = SchemaFactory.createForClass(Company);
