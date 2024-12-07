import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  fullName: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  acceptedTocAt: string;

  @IsString()
  @IsOptional()
  acceptedNewsletterAt?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  birthDate: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ensembleIds: string[];

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString()
  updatedAt: string;
}
