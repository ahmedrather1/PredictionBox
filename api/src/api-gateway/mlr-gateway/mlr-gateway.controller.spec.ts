import { Test, TestingModule } from '@nestjs/testing';
import { MlrGatewayController } from './mlr-gateway.controller';

describe('MlrGatewayController', () => {
  let controller: MlrGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MlrGatewayController],
    }).compile();

    controller = module.get<MlrGatewayController>(MlrGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
