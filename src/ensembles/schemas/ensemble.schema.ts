import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnsembleDocument = HydratedDocument<Ensemble>;

@Schema()
export class Ensemble {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  @Optional()
  imageUrl: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  website: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  activeMusicians: string;

  @Prop({ required: true })
  practiceFrequency: string;

  @Prop({ required: true })
  practiceType: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ type: [{ fullName: String, id: String }] })
  registeredUsers: { fullName: string; id: string }[];

  @Prop({ default: () => new Date(), required: true })
  createdAt: Date;

  @Prop({ default: () => new Date(), required: true })
  updatedAt: Date;

  @Prop()
  @Optional()
  deactivatedAt: Date;
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);
