import { INestApplication } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Model } from 'mongoose';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/daos_test_auth'),
        AppModule,
        AuthModule,
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userModel = moduleFixture.get<Model<User>>(getModelToken('User'));
  });

  beforeAll(async () => {
    await userModel.deleteMany();
    await userModel.insertMany([
      {
        _id: '676403c054ff6e1f8aa4650d',
        fullName: 'Test Testing',
        email: 'test1@test1.com',
        password:
          '$2b$10$PqEELfyv5rykU2AFXlZGgO/iFAR/HNJqKuiRTU5LQnVWDVIKgnELW',
        ensembleIds: [],
        acceptedTocAt: '2024-12-19T11:30:08.264+00:00',
        createAd: '2024-12-19T11:30:08.264+00:00',
        updatedAt: '2024-12-19T11:30:08.264+00:00',
        __v: 0,
      },
      {
        _id: '6764045254ff6e1f8aa4650f',
        fullName: 'Test2 Testing2',
        email: 'test2@test2.com',
        password:
          '$2b$10$jO65OJEY3TtSu0ck8EMtke5ZpMUehpClBshXHGu6kcUVJFSg5v3tS',
        ensembleIds: [],
        acceptedTocAt: '2024-12-19T11:32:34.484+00:00',
        createAd: '2024-12-19T11:32:34.484+00:00',
        updatedAt: '2024-12-19T11:32:34.484+00:00',
        __v: 0,
      },
    ]);
  });

  afterAll(async () => {
    await userModel.deleteMany();
    await app.close();
  });

  it('/auth/login should return an access_token', async () => {
    const loginInfo = {
      email: 'test2@test2.com',
      password: '12345678',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginInfo)
      .expect(200);

    expect(response.body).toHaveProperty('access_token');
  });

  it('/auth/login should return an error if the password is incorrect', async () => {
    const loginInfo = {
      email: 'test2@test2.com',
      password: '87654321',
    };

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginInfo)
      .expect(401);
  });
});
