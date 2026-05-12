import { Test, TestingModule } from '@nestjs/testing';
import { DealerFormService } from './dealerForm.service';

describe('DealerService', () => {
  let service: DealerFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealerFormService],
    }).compile();

    service = module.get<DealerFormService>(DealerFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
