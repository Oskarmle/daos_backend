import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsEnum(['Im playing', 'Im looking for one playing'])
  @IsOptional()
  postType: 'Im playing' | 'Im looking for one playing';

  @IsEnum([
    'Violone',
    'Violin',
    'Viola',
    'Viol',
    'Vihuela',
    'Trumpet',
    'Theorbo',
    'Slide trumpet',
    'Serpent',
    'Sackbut',
    'Natural trumpet',
    'Natural Horn',
  ])
  @IsOptional()
  instrument:
    | 'Violone'
    | 'Violin'
    | 'Viola'
    | 'Viol'
    | 'Vihuela'
    | 'Trumpet'
    | 'Theorbo'
    | 'Slide trumpet'
    | 'Serpent'
    | 'Sackbut'
    | 'Natural trumpet'
    | 'Natural Horn';

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  area: string;

  @IsString()
  @IsOptional()
  ensembleName: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;

  @IsDateString()
  deactivatedAt: string;
}
