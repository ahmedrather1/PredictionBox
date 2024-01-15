import { Test, TestingModule } from '@nestjs/testing';
import { DemoDataController } from './demo-data.controller';

describe('DemoDataController', () => {
  let controller: DemoDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoDataController],
    }).compile();

    controller = module.get<DemoDataController>(DemoDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
