import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorFilter } from './filters/global.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:3001'] });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalErrorFilter());
  app.use(helmet());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
