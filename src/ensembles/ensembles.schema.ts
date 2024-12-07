import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnsembleDocument = HydratedDocument<Ensemble>;

@Schema()
export class Ensemble {
  @Prop()
  name: string;

  @Prop()
  imageUrl: string;

  @Prop()
  description: string;

  @Prop()
  website: string;

  @Prop()
  zip_code: string;

  @Prop()
  city: string;

  @Prop()
  active_musicians: '1-4' | '5-9' | '10-24' | '25-49' | '50+';

  @Prop()
  practice_frequency:
    | 'daily'
    | 'weekly'
    | 'bi-weekly'
    | 'monthly'
    | 'bi-monthly';

  @Prop()
  ensemble_type: Array<'continuous' | 'project_based'>;

  @Prop()
  genre: Array<
    | 'baroque'
    | 'folk'
    | 'chamber'
    | 'romantic'
    | 'late-modern'
    | 'late-romantic'
    | 'symphonic'
  >;

  @Prop()
  admin_user_id: string;

  @Prop()
  created_at: string;

  @Prop()
  updated_at?: string;

  @Prop({ index: true })
  deactivated_at?: string;
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);
