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

describe('Ensemble (e2e', () => {
  let app: INestApplication;
  let ensembleModel: Model<Ensemble>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/daos_test'),
        MongooseModule.forFeature([
          { name: Ensemble.name, schema: EnsembleSchema },
        ]),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    ensembleModel = moduleFixture.get<Model<Ensemble>>(
      getModelToken('Ensemble'),
    );
  });

  beforeEach(async () => {
    await ensembleModel.deleteMany();
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
});
