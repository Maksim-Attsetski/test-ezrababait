import { getApiError } from './getApiError';

class Logger {
  isProd?: boolean;

  constructor() {
    this.isProd = !process.env.NODE_ENV || process.env.NODE_ENV === 'production'
  }

  log (msg?: string, data?: any) {
    console.log(msg, data || '');
  }
  info (msg?: string, data?: any) {
    !this.isProd && console.log(msg, data || '');
  }
  error (msg?: string, data?: any) {
    const err = getApiError(data);
    console.error(msg, err);
  }
}

export default new Logger();