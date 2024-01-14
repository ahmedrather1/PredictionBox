import { Module } from '@nestjs/common';
import { KnnGatewayController } from './knn-gateway/knn-gateway.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [KnnGatewayController],
})
export class ApiGatewayModule {}
