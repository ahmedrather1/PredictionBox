import { Module } from '@nestjs/common';
import { KnnGatewayController } from './knn-gateway/knn-gateway.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [KnnGatewayController],
})
export class ApiGatewayModule {}
