import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(json({ limit: '500kb' }));
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.listen(8080);
}
bootstrap();
