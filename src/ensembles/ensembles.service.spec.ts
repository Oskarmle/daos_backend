import { Test, TestingModule } from '@nestjs/testing';
import { EnsemblesService } from './ensembles.service';

describe('EnsemblesService', () => {
  let service: EnsemblesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnsemblesService],
    }).compile();

    service = module.get<EnsemblesService>(EnsemblesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
