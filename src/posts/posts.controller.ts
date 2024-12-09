import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';
import { FindPostsQueryDto } from './dto/find-post-query.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get() // Get all posts
  async findAll(@Query() query: FindPostsQueryDto) {
    return this.postsService.findAll(query);
  }

  @Get(':_id') // Get a specific post
  findOne(@Param('_id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post() // Create a new post
  create(@Body() post: CreatePostDto) {
    return this.postsService.create(post);
  }

  @Patch(':_id') // Update post
  update(@Param('_id') _id: string, @Body() postUpdate: UpdatePostDto) {
    return this.postsService.update(_id, postUpdate);
  }

  @Delete(':_id') // Delete post
  delete(@Param('_id') _id: string) {
    return this.postsService.delete(_id);
  }
}
