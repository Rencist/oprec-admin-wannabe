import { Test, TestingModule } from '@nestjs/testing';
import { ListLabService } from './list_lab.service';

describe('ListLabService', () => {
  let service: ListLabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListLabService],
    }).compile();

    service = module.get<ListLabService>(ListLabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
