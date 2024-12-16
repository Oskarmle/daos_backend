import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  // UseGuards,
  // Request,
  // Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
    return { message: 'Profile created successfully' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   const userId = req.user.id;
  //   const userEmail = req.user.email;
  //   return { userId, userEmail };
  // }
}
