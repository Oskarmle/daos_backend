import { IsString } from 'class-validator';

export class RegisteredUser {
  @IsString()
  fullName: string;

  @IsString()
  id: string;
}
