import { Module } from '@nestjs/common';
import { KnnGatewayController } from './knn-gateway/knn-gateway.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SlrGatewayController } from './slr-gateway/slr-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { MlrGatewayController } from './mlr-gateway/mlr-gateway.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [KnnGatewayController, SlrGatewayController, MlrGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
