import { Document } from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { LocationsStatus } from '../enums/locations.enums';

@Schema({ timestamps: true })
export class Location extends Document {


    @Prop({ enum: LocationsStatus, default: LocationsStatus.ACTIVE })
    status: LocationsStatus;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, ref: 'Community' })
    community: string;

    @Prop({ ref: 'User' })
    createdBy: string;

    @Prop({ ref: 'User' })
    updatedBy: string;
    //TODO add createdBy and updatedBy

}


export const LocationSchema = SchemaFactory.createForClass(Location);