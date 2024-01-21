import { Module } from '@nestjs/common';
import { DemoDataController } from './demo-data.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [DemoDataController],
})
export class DemoDataModule {}
