/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('api', app, createDocument(app));
  app.use(cookieParser());
  app.enableCors({
    origin: "http://localhost:8080",
    credentials: true
  })
  await app.listen(8000);
}
bootstrap();
