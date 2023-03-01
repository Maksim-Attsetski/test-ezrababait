class Config {
  PORT;

  constructor() {
    this.init();
  }

  init() {
    this.PORT = process.env.PORT || 5000;
  }
}

export default new Config();
