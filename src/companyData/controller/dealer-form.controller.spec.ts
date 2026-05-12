import { Test, TestingModule } from '@nestjs/testing';
import { DealerFormController } from './dealer-form.controller';

describe('DealerFormController', () => {
  let controller: DealerFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealerFormController],
    }).compile();

    controller = module.get<DealerFormController>(DealerFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
