import express, { Router } from 'express';
import Config from './config';

class Express {
  app;

  constructor() {
    this.app = express();
    this.init();
  }

  init() {
    this.app.use(express.json());
  }

  loadServer() {
    this.app.listen(Config.PORT, () => {
      console.log(`Server starts on ${Config.PORT} port!`);
    });
  }
}

export default new Express();
