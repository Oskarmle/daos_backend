import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateEnsembleDto {
  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsString()
  description: string;

  @IsString()
  website: string;

  @IsString()
  zipCode: string;

  @IsString()
  city: string;

  @IsEnum(['1-4', '5-9', '10-24', '25-49', '50+'])
  activeMusicians: '1-4' | '5-9' | '10-24' | '25-49' | '50+';

  @IsEnum(['daily', 'weekly', 'bi-weekly', 'monthly', 'bi-monthly'])
  practiceFrequency:
    | 'daily'
    | 'weekly'
    | 'bi-weekly'
    | 'monthly'
    | 'bi-monthly';

  @IsEnum(['continuous', 'project_based'])
  practiceType: 'continuous' | 'project_based';

  @IsEnum([
    'baroque',
    'folk',
    'chamber',
    'romantic',
    'late-modern',
    'late-romantic',
    'symphonic',
  ])
  genre:
    | 'baroque'
    | 'folk'
    | 'chamber'
    | 'romantic'
    | 'late-modern'
    | 'late-romantic'
    | 'symphonic';

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  @IsDateString()
  @IsOptional()
  deactivatedAt: string;
}
