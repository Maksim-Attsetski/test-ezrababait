class Config {
  refreshSecret: string;
  accessSecret: string;
  PORT: number;
  defaultUrl: string;

  constructor() {
    this.init();
  }

  init() {
    this.accessSecret = process.env.SECRET_KEY_ACCESS || 'Access';
    this.refreshSecret = process.env.SECRET_KEY_REFRESH || 'Refresh';
    this.PORT = +process.env.PORT || 8080;
    this.defaultUrl = '/api';
  }
}

export default new Config();
