import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // TODO - uncomment this
    // app.enableCors({
    //     origin: process.env.WEB_URL,
    //     credentials: true,
    // });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.listen(3000);
}
bootstrap();
