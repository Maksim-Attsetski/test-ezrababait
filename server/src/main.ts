import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app/app.module';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log(`Server starts on ${PORT} port!`);
  });
}

bootstrap();
