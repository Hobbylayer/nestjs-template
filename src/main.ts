import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

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

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(helmet());
  app.use(compression());

  await app.listen(port || 3000);
  logger.debug(`🚀 API launched on: ${await app.getUrl()}`);
}
bootstrap();
