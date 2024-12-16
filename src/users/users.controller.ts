import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // Get all users or /users?ensembleId=value
  async findAll(
    @Query('ensembleId', new ParseArrayPipe({ optional: true, items: String }))
    ensembleId?: string | string[],
  ) {
    const ensembleIds = Array.isArray(ensembleId)
      ? ensembleId
      : ensembleId?.split(',');

    return this.usersService.findAll(ensembleIds);
  }

  @Get(':email') // Get specific user/:_id
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  // @Post() // Create a new user
  // create(@Body() user: CreateUserDto) {
  //   return this.usersService.create(user);
  // }

  @UseGuards(AuthGuard)
  @Patch(':_id') // Patch/Edit specific user/:_id
  update(@Param('_id') _id: string, @Body() userUpdate: UpdateUserDto) {
    return this.usersService.update(_id, userUpdate);
  }

  @UseGuards(AuthGuard)
  @Delete(':_id') // Delete a specific user
  delete(@Param('_id') _id: string) {
    return this.usersService.delete(_id);
  }
}
