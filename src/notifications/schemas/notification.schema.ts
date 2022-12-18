import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { STATUS_DOCUMENT } from 'src/common/enums/common.enums';
import { KIND_NOTIFICATION } from '../enums';

@Schema()
export class Notification extends Document {

    @Prop({ type: Types.ObjectId, required: true })
    readonly community: Types.ObjectId;

    @Prop({ type: Array })
    readonly recipients: Types.ObjectId[];

    @Prop({ type: String, required: true })
    readonly title: string;

    @Prop({ type: String, required: true })
    readonly body: string;

    @Prop({ type: String, enum: KIND_NOTIFICATION, required: true })
    readonly kind: KIND_NOTIFICATION;

    @Prop({ type: String, default: new Date().toISOString().split('T')[0] })
    readonly date: string;

    @Prop({ type: String })
    readonly show_away_from: string;

    @Prop({ type: String })
    readonly show_until: string;

    @Prop({ type: String, default: null })
    readonly actionUrl?: string

    @Prop({ type: String, default: null })
    readonly actionText?: string

    @Prop({ type: Boolean, default: false })
    readonly haveAction?: boolean

    @Prop({ type: String, enum: STATUS_DOCUMENT, required: false })
    readonly status?: STATUS_DOCUMENT;

    @Prop({ type: Boolean, default: true })
    readonly isRead?: boolean;

    @Prop({ type: Types.ObjectId, required: false, ref: 'User' })
    readonly createdBy?: string;

    @Prop({ type: Types.ObjectId, required: false, ref: 'User' })
    readonly updatedBy?: string;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notification);