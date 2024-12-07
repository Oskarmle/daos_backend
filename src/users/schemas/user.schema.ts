import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  acceptedTocAt: Date;

  @Prop()
  @Optional()
  acceptedNewsletterAt?: Date;

  @Prop()
  @Optional()
  address?: string;

  @Prop()
  @Optional()
  phoneNumber?: string;

  @Prop()
  @Optional()
  bio?: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop()
  @Optional()
  ensembleIds: string[];

  @Prop({ default: () => new Date() })
  createAd: Date;

  @Prop({ default: () => new Date() })
  @Optional()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
