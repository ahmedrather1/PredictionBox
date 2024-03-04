import { Test, TestingModule } from '@nestjs/testing';
import { LassoGatewayController } from './lasso-gateway.controller';

describe('LassoGatewayController', () => {
  let controller: LassoGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LassoGatewayController],
    }).compile();

    controller = module.get<LassoGatewayController>(LassoGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
