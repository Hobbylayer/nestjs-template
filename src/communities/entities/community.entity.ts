import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Community extends Document {

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
    currenc: string;

    @Prop({ required: true })
    owner: string;

    @Prop({ default: 'active' })
    active: string;

    //TODO add createdBy and updatedBy
}

export const CommunitySchema = SchemaFactory.createForClass(Community);