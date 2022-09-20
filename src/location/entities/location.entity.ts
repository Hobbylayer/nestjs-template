import { Document, Types } from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { LocationsStatus } from '../enums/locations.enums';

@Schema({ timestamps: true })
export class Location extends Document {

    @Prop({ enum: LocationsStatus, default: LocationsStatus.ACTIVE })
    status: LocationsStatus;

    @Prop({ required: true })
    name: string;

    @Prop({ type: String })
    description: string

    @Prop({ required: true, ref: 'Community' })
    community: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    residentId: string

    @Prop({ type: Types.ObjectId, ref: 'User' })
    ownerId: string

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    updatedBy: string;

}


export const LocationSchema = SchemaFactory.createForClass(Location);