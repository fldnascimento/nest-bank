import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const options = new DocumentBuilder()
    .setTitle('Nest Bank API')
    .setDescription('Api para o banco Nest Bank')
    .setVersion('1.0')
    .addTag('nest-bank-api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
