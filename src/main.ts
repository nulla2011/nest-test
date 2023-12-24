import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Filter } from './app.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('data', { prefix: '/test' });
  app.useGlobalFilters(new Filter());
  await app.listen(3000);
}
bootstrap();
