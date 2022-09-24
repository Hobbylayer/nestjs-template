import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Setting extends Document {

    @Prop({
        type: Boolean,
        default: false
    })
    isMulticurrency: boolean;

    @Prop({
        type: Boolean,
        default: false
    })
    hasLocations: boolean;

}

export const SettingsSchema = SchemaFactory.createForClass(Setting)