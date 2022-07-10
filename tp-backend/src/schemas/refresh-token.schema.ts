import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
    @Prop() id: number;
    @Prop() username: string;
    @Prop() userId: string;
    @Prop() email: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
