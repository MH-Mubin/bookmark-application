import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //if there's any other field that shouldn't be in req body this line removes it.
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
