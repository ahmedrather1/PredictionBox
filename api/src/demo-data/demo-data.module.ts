import { Module } from '@nestjs/common';
import { DemoDataController } from './demo-data.controller';

@Module({
  controllers: [DemoDataController]
})
export class DemoDataModule {}
