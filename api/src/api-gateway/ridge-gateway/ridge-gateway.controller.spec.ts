import { Test, TestingModule } from '@nestjs/testing';
import { RidgeGatewayController } from './ridge-gateway.controller';

describe('RidgeGatewayController', () => {
  let controller: RidgeGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidgeGatewayController],
    }).compile();

    controller = module.get<RidgeGatewayController>(RidgeGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
