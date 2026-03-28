import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSystem } from './payment-system.service';

describe('PaymentSystem', () => {
  let service: PaymentSystem;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentSystem],
    }).compile();

    service = module.get<PaymentSystem>(PaymentSystem);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
