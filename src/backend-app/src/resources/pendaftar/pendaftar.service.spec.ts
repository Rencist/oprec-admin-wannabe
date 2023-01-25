import { Test, TestingModule } from '@nestjs/testing';
import { PendaftarService } from './pendaftar.service';

describe('PendaftarService', () => {
  let service: PendaftarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendaftarService],
    }).compile();

    service = module.get<PendaftarService>(PendaftarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
