import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './api/app/app.module';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.log(`Server starts on ${PORT} port!`);
  });
}

bootstrap();
