import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';
import { FindPostsQueryDto } from './dto/find-post-query.dto';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  // Mock the PostsService methods
  const mockPostsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  // Test the findAll method
  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result = [{ title: 'Post 1' }, { title: 'Post 2' }];
      mockPostsService.findAll.mockResolvedValue(result);

      expect(await postsController.findAll({} as FindPostsQueryDto)).toBe(
        result,
      );
    });
  });

  // Test the findOne method
  describe('findOne', () => {
    it('should return a post by ID', async () => {
      const result = { title: 'Post 1' };
      const postId = '123';
      mockPostsService.findOne.mockResolvedValue(result);

      expect(await postsController.findOne(postId)).toBe(result);
    });
  });

  // Test the create method
  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'New Post',
        postType: 'Im playing',
        instrument: 'Violone',
        description: 'test',
        area: 'test',
        ensembleName: 'test',
        website: 'test',
        createdBy: 'test',
        createdAt: '2024-12-09T13:29:08.495+00:00',
        updatedAt: '2024-12-09T13:29:08.495+00:00',
        deactivatedAt: '',
      };
      const result = { title: 'New Post' };
      mockPostsService.create.mockResolvedValue(result);

      expect(await postsController.create(createPostDto)).toBe(result);
    });
  });

  // Test the update method
  describe('update', () => {
    it('should update a post by ID', async () => {
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Post',
        postType: 'Im playing',
        instrument: 'Violone',
        description: '',
        area: '',
        ensembleName: '',
        website: '',
        createdBy: '',
        createdAt: undefined,
        updatedAt: undefined,
        deactivatedAt: '',
      };
      const result = { title: 'Updated Post' };
      const postId = '123';
      mockPostsService.update.mockResolvedValue(result);

      expect(await postsController.update(postId, updatePostDto)).toBe(result);
    });
  });

  // Test the delete method
  describe('delete', () => {
    it('should delete a post by ID', async () => {
      const postId = '123';
      mockPostsService.delete.mockResolvedValue(undefined);

      expect(await postsController.delete(postId)).toBe(undefined);
    });
  });
});
