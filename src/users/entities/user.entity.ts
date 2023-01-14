import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop({ select: false })
  password: string;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop({ type: Array, enum: Roles, default: Roles.ADMIN })
  roles: Roles[];

  @Prop()
  urlAvatar: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', index: true })
  company: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
