import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { DemoDataModule } from './demo-data/demo-data.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiGatewayModule,
    UserModule,
    DatabaseModule,
    DemoDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
