import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  /*
   * Logger can shown the above logs types:
   * ['error', 'warn', 'debug', 'log', 'verbose' ]
   */
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'debug'],
    cors: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const logger = new Logger();

  app.setGlobalPrefix('api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  // Openapi specification (swagger)
  const config = new DocumentBuilder()
    .setTitle('Condominios')
    .setDescription('API condominios')
    .setVersion('1.0')
    .addTag('condos')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  await app.listen(port || 3000);
  logger.debug(`🚀 API launched on: ${await app.getUrl()}`);
}
bootstrap();
