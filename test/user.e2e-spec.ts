import { INestApplication } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth.module';
// import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';

describe('User (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<User>;
  let authService: AuthService;

  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/daos_test'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AppModule,
        AuthModule,
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userModel = moduleFixture.get<Model<User>>(getModelToken('User'));
    authService = moduleFixture.get<AuthService>(AuthService);
  });

  beforeEach(async () => {
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
    const loginResponse = await authService.login(
      'test2@test2.com',
      '12345678',
    );
    token = loginResponse.access_token;
  });

  afterAll(async () => {
    await userModel.deleteMany();
    await app.close();
  });

  it('/users (GET) should return all users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toMatchObject([
      {
        _id: '676403c054ff6e1f8aa4650d',
        fullName: 'Test Testing',
        email: 'test1@test1.com',
        password:
          '$2b$10$PqEELfyv5rykU2AFXlZGgO/iFAR/HNJqKuiRTU5LQnVWDVIKgnELW',
        ensembleIds: [],
        __v: 0,
      },
      {
        _id: '6764045254ff6e1f8aa4650f',
        fullName: 'Test2 Testing2',
        email: 'test2@test2.com',
        password:
          '$2b$10$jO65OJEY3TtSu0ck8EMtke5ZpMUehpClBshXHGu6kcUVJFSg5v3tS',
        ensembleIds: [],
        __v: 0,
      },
    ]);
  });

  it('/users:email (GET) should return the user with the email: test1@test1.com', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/test1@test1.com')
      .expect(200);
    expect(response.body).toMatchObject({
      _id: '676403c054ff6e1f8aa4650d',
      fullName: 'Test Testing',
      email: 'test1@test1.com',
      password: '$2b$10$PqEELfyv5rykU2AFXlZGgO/iFAR/HNJqKuiRTU5LQnVWDVIKgnELW',
      ensembleIds: [],
      __v: 0,
    });
  });

  it('/users:_id (PATCH) should return the user (6764045254ff6e1f8aa4650f) with changes fullname to "Woop Woop"', async () => {
    const updatedUser = {
      fullName: 'Woop Woop',
    };

    const response = await request(app.getHttpServer())
      .patch('/users/6764045254ff6e1f8aa4650f')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
      .expect(200);

    expect(response.body.fullName).toBe('Woop Woop');
  });

  it('/users:_id should delete the user with the id: 676403c054ff6e1f8aa4650d', async () => {
    await request(app.getHttpServer())
      .delete('/users/676403c054ff6e1f8aa4650d')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
