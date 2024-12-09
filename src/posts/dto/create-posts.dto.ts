import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsEnum(['Im playing', 'Im looking for one playing'])
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
  description: string;

  @IsString()
  area: string;

  @IsString()
  @IsOptional()
  ensembleName: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  createdBy: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  @IsDateString()
  @IsOptional()
  deactivatedAt: string;
}
