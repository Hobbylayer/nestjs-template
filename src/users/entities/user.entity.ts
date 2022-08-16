import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Roles, UserStatus } from '../enums/users.enums';


@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true })
    name: string;

    @Prop()
    lastName: string;

    @Prop()
    phone: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ type: String, unique: true })
    dni: string;

    @Prop({ select: false })
    password: string;

    @Prop({ type: String, enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @Prop({ type: Array, enum: Roles, default: Roles.RESIDENT })
    roles: Roles[];

    @Prop()
    urlAvatar: string;

    @Prop({ type: Types.ObjectId, ref: 'Community' })
    community: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Location' })
    location: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
