import { Test, TestingModule } from '@nestjs/testing';
import { EnsemblesController } from './ensembles.controller';
import { EnsemblesService } from './ensembles.service';

describe('EnsemblesController', () => {
  let controller: EnsemblesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnsemblesController],
      providers: [EnsemblesService],
    }).compile();

    controller = module.get<EnsemblesController>(EnsemblesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
