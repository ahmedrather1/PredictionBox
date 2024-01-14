import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // replace with your front-end application's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
  });
  // app.use(multer().any());
  await app.listen(8080);
}
bootstrap();
