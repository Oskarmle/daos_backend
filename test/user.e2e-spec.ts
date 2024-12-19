import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from 'src/users/schemas/user.schema';

describe('User (e2e)', () => {
  let app: INestApplication;

  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/daos_test'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
    });
  });
});
