import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Habilitar CORS para el frontend (ajusta el origin si tu frontend corre en otro puerto o dominio)
  app.enableCors({
    origin: 'http://localhost:3001', // Cambia al puerto y dominio donde corre tu frontend
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
