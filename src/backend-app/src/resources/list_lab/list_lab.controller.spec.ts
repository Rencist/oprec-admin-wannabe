import { Test, TestingModule } from '@nestjs/testing';
import { ListLabController } from './list_lab.controller';
import { ListLabService } from './list_lab.service';

describe('ListLabController', () => {
  let controller: ListLabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListLabController],
      providers: [ListLabService],
    }).compile();

    controller = module.get<ListLabController>(ListLabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
