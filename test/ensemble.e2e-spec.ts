import {
  Ensemble,
  EnsembleSchema,
} from 'src/ensembles/schemas/Ensemble.schema';
import { INestApplication } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/schemas/user.schema';

describe('Ensemble (e2e)', () => {
  let app: INestApplication;
  let ensembleModel: Model<Ensemble>;
  let authService: AuthService;
  let userModel: Model<User>;

  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/daos_test'),
        MongooseModule.forFeature([
          { name: Ensemble.name, schema: EnsembleSchema },
        ]),
        AppModule,
        AuthModule,
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    ensembleModel = moduleFixture.get<Model<Ensemble>>(
      getModelToken('Ensemble'),
    );
    userModel = moduleFixture.get<Model<User>>(getModelToken('User'));
    authService = moduleFixture.get<AuthService>(AuthService);
  });

  beforeEach(async () => {
    await ensembleModel.deleteMany();
    await userModel.deleteMany();
    await userModel.insertMany([
      {
        _id: '6760207a1cecf80940c5d68a',
        fullName: 'test',
        email: 'test@test.com',
        password:
          '$2b$10$.o9n2VjUyopeMRlOQLaZY.bkH0YpNIa3pKbbU8PnkS0qDjSCHWC82',
        ensembleIds: [],
        acceptedTocAt: '2024-12-16T12:43:38.986Z',
        createAd: '2024-12-16T12:43:38.986Z',
        updatedAt: '2024-12-16T12:43:38.986Z',
        __v: 0,
      },
    ]);
    const loginResponse = await authService.login('test@test.com', 'Onsdag12');

    token = loginResponse.access_token;
    await ensembleModel.insertMany([
      {
        __v: 0,
        _id: '676184da1c51ba9809dcc7ce',
        name: 'test2',
        description: 'test2',
        website: 'test2',
        zipCode: 'test2',
        city: 'test2',
        activeMusicians: '5-9',
        practiceFrequency: 'bi-weekly',
        practiceType: 'project_based',
        genre: 'folk',
        createdAt: '2024-12-17T14:04:10.365Z',
        updatedAt: '2024-12-17T14:04:10.365Z',
        registeredUsers: [],
      },
      {
        __v: 0,
        _id: '676184da1c51ba9809ddd7ce',
        name: 'test1',
        description: 'test1',
        website: 'test1',
        zipCode: 'test1',
        city: 'test1',
        activeMusicians: '5-9',
        practiceFrequency: 'bi-weekly',
        practiceType: 'project_based',
        genre: 'folk',
        createdAt: '2024-12-17T14:04:10.365Z',
        updatedAt: '2024-12-17T14:04:10.365Z',
        registeredUsers: [],
      },
    ]);
  });

  afterAll(async () => {
    await ensembleModel.deleteMany();
    await userModel.deleteMany();
    await app.close();
  });

  // Testing the get request findAll for ensembles
  it('/ensembles (GET) should return a list of ensembles', async () => {
    const response = await request(app.getHttpServer())
      .get('/ensembles')
      .expect(200);

    expect(response.body).toEqual([
      {
        __v: 0,
        _id: '676184da1c51ba9809dcc7ce',
        name: 'test2',
        description: 'test2',
        website: 'test2',
        zipCode: 'test2',
        city: 'test2',
        activeMusicians: '5-9',
        practiceFrequency: 'bi-weekly',
        practiceType: 'project_based',
        genre: 'folk',
        createdAt: '2024-12-17T14:04:10.365Z',
        updatedAt: '2024-12-17T14:04:10.365Z',
        registeredUsers: [],
      },
      {
        __v: 0,
        _id: '676184da1c51ba9809ddd7ce',
        name: 'test1',
        description: 'test1',
        website: 'test1',
        zipCode: 'test1',
        city: 'test1',
        activeMusicians: '5-9',
        practiceFrequency: 'bi-weekly',
        practiceType: 'project_based',
        genre: 'folk',
        createdAt: '2024-12-17T14:04:10.365Z',
        updatedAt: '2024-12-17T14:04:10.365Z',
        registeredUsers: [],
      },
    ]);
  });

  it('/ensemble:_id should return the ensemble with the id: 676184da1c51ba9809dcc7ce', async () => {
    const response = await request(app.getHttpServer())
      .get('/ensembles/676184da1c51ba9809dcc7ce')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({
      __v: 0,
      _id: '676184da1c51ba9809dcc7ce',
      name: 'test2',
      description: 'test2',
      website: 'test2',
      zipCode: 'test2',
      city: 'test2',
      activeMusicians: '5-9',
      practiceFrequency: 'bi-weekly',
      practiceType: 'project_based',
      genre: 'folk',
      createdAt: '2024-12-17T14:04:10.365Z',
      updatedAt: '2024-12-17T14:04:10.365Z',
      registeredUsers: [],
    });
  });

  // Testing the post request create for ensembles
  it('/ensembles (POST) should create a new ensemble', async () => {
    const ensembleData = {
      name: 'New Ensemble',
      description: 'A new test ensemble',
      website: 'http://test.com',
      zipCode: '12345',
      city: 'Test City',
      activeMusicians: '5-9',
      practiceFrequency: 'weekly',
      practiceType: 'project_based',
      genre: 'pop',
      registeredUsers: ['6760207a1cecf80940c5d68a'],
    };

    const response = await request(app.getHttpServer())
      .post('/ensembles')
      .set('Authorization', `Bearer ${token}`)
      .send(ensembleData)
      .expect(201);

    expect(response.body.name).toBe('New Ensemble');
  });

  it('/ensembles:_id (PATCH) should update the ensemble registeredUsers', async () => {
    const updatedEnsemble = {
      registeredUsers: [
        {
          fullName: 'oskar eriksen',
          id: '6760207a1cecf80940c2d68a',
        },
      ],
    };

    await request(app.getHttpServer())
      .patch('/ensembles/676184da1c51ba9809ddd7ce')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedEnsemble)
      .expect(200);
  });

  it('/ensembles:_id (DELETE) should delete the ensemble with the id: 676184da1c51ba9809ddd7ce', async () => {
    await request(app.getHttpServer())
      .delete('/ensembles/676184da1c51ba9809ddd7ce')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/ensembles:_id (DELETE) should throw an error due to token not being provided', async () => {
    await request(app.getHttpServer())
      .delete('/ensembles/676184da1c51ba9809ddd7ce')
      .expect(401);
  });
});
