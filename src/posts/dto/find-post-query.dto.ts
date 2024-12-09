import { IsOptional, IsEnum } from 'class-validator';

export class FindPostsQueryDto {
  @IsOptional()
  @IsEnum(['Im playing', 'Im looking for one playing'])
  postType?: 'Im playing' | 'Im looking for one playing';

  @IsOptional()
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
  instrument?:
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
}
