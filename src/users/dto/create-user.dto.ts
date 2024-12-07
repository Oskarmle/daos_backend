import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsDateString()
  acceptedTocAt: string;

  @IsDateString()
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

  @IsDateString()
  birthDate: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ensembleIds: string[];

  @IsDateString()
  createdAt: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}
