import { Test, TestingModule } from '@nestjs/testing';
import { PendaftarController } from './pendaftar.controller';
import { PendaftarService } from './pendaftar.service';

describe('PendaftarController', () => {
  let controller: PendaftarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendaftarController],
      providers: [PendaftarService],
    }).compile();

    controller = module.get<PendaftarController>(PendaftarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
