import { IsArray, IsDateString, IsEnum, IsString } from 'class-validator';

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

  @IsString()
  activeMusicians: string;

  @IsString()
  practiceFrequency: string;

  @IsArray()
  @IsEnum(['continuous', 'project_based'], { each: true })
  practiceType: ('continuous' | 'project_based')[];

  @IsArray()
  @IsEnum(
    [
      'baroque',
      'folk',
      'chamber',
      'romantic',
      'late-modern',
      'late-romantic',
      'symphonic',
    ],
    { each: true },
  )
  genre: (
    | 'baroque'
    | 'folk'
    | 'chamber'
    | 'romantic'
    | 'late-modern'
    | 'late-romantic'
    | 'symphonic'
  )[];

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  @IsDateString()
  deactivatedAt: string;
}
