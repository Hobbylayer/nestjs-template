import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { STATUS_DOCUMENT } from 'src/common/enums/common.enums';

export class Notification extends Document {
    @Prop({ type: String, required: true })
    readonly title: string;

    @Prop({ type: String })
    readonly date: string;

    @Prop({ type: String })
    readonly show_away_from: string;

    @Prop({ type: String })
    readonly show_until: string;

    @Prop({ type: String, required: true })
    readonly body: string;

    @Prop({ type: String, default: null })
    readonly actionUrl?: string

    @Prop({ type: String, default: null })
    readonly actionText?: string

    @Prop({ type: Boolean, default: null })
    readonly haveAction?: boolean

    @Prop({
        type: [
            {
                user: { type: Types.ObjectId, ref: 'User' },
            },
        ],
    })
    viewedBy: { user_id: string }[];


    @Prop({
        type: [
            {
                user: { type: Types.ObjectId, ref: 'User' },
            },
        ],
    })
    destinations: { id: string; user_id: string }[];

    @Prop({ type: STATUS_DOCUMENT, required: false })
    readonly status?: STATUS_DOCUMENT;

    @Prop({ type: Types.ObjectId, required: false, ref: 'User' })
    readonly createdBy?: string;

    @Prop({ type: Types.ObjectId, required: false, ref: 'User' })
    readonly updatedBy?: string;
}

export const Notifications = SchemaFactory.createForClass(Notification);
