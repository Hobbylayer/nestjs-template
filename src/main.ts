import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
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

  await app.listen(port || 3000);
  logger.debug(`🚀 API launched on: ${await app.getUrl()}`);
}
bootstrap();
