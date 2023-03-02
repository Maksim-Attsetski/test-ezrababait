import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import Config from './config';

import { AppModule } from 'src/api/app/app.module';

class App {
  async loadServer() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.setGlobalPrefix(Config.defaultUrl);
    app.enableCors({ credentials: true, origin: ['http://localhost:3000'] });

    await app.listen(Config.PORT, () => {
      console.log(`Server starts on ${Config.PORT} port!`);
    });
  }
}

export default new App();
