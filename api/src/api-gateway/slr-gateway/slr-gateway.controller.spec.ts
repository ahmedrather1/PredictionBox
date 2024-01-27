import { Test, TestingModule } from '@nestjs/testing';
import { SlrGatewayController } from './slr-gateway.controller';

describe('SlrGatewayController', () => {
  let controller: SlrGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlrGatewayController],
    }).compile();

    controller = module.get<SlrGatewayController>(SlrGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
