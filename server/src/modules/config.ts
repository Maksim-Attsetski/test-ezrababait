class Config {
  refreshSecret: string;
  accessSecret: string;
  constructor() {
    this.accessSecret = process.env.SECRET_KEY_ACCESS || 'Access';
    this.refreshSecret = process.env.SECRET_KEY_REFRESH || 'Refresh';
  }
}

export default new Config();
