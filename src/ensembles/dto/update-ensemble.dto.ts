import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RegisteredUser } from './registered-user.dto';
import { Type } from 'class-transformer';

export class UpdateEnsembleDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  zipCode: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsEnum(['1-4', '5-9', '10-24', '25-49', '50+'])
  @IsOptional()
  activeMusicians: '1-4' | '5-9' | '10-24' | '25-49' | '50+';

  @IsString()
  @IsOptional()
  practiceFrequency: string;

  @IsEnum(['continuous', 'project_based'])
  @IsOptional()
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
  @IsOptional()
  genre:
    | 'baroque'
    | 'folk'
    | 'chamber'
    | 'romantic'
    | 'late-modern'
    | 'late-romantic'
    | 'symphonic';

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RegisteredUser)
  registeredUsers: RegisteredUser[];
  @IsDateString()
  @IsOptional()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
