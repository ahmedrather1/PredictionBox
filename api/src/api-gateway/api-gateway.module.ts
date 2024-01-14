import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';

@Module({
  controllers: [ApiGatewayController]
})
export class ApiGatewayModule {}
