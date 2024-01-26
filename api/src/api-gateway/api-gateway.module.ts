import { Module } from '@nestjs/common';
import { KnnGatewayController } from './knn-gateway/knn-gateway.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SlrGatewayController } from './slr-gateway/slr-gateway.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [KnnGatewayController, SlrGatewayController],
})
export class ApiGatewayModule {}
