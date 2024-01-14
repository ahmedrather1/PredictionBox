import { Test, TestingModule } from '@nestjs/testing';
import { KnnGatewayController } from './knn-gateway.controller';

describe('KnnGatewayController', () => {
  let controller: KnnGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnnGatewayController],
    }).compile();

    controller = module.get<KnnGatewayController>(KnnGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
