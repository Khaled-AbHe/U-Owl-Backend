import { Test, TestingModule } from '@nestjs/testing';
import { MaptilerService } from './maptiler.service';

describe('MaptilerService', () => {
  let service: MaptilerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaptilerService],
    }).compile();

    service = module.get<MaptilerService>(MaptilerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
