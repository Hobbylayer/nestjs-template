import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'


@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true })
    name: string;

    @Prop()
    lasName: string;

    @Prop()
    phone: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ type: String, unique: true })
    dni: string;

    @Prop()
    password: string;

    @Prop()
    status: string;

    @Prop()
    role: string[];

    @Prop()
    urlAvatar: string;

    @Prop({ type: Types.ObjectId, ref: 'Community' })
    community: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
