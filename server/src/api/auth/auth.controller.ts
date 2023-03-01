import { Controller, Post, Body, Res } from '@nestjs/common';
import { Errors } from 'src/utils';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  cookieOptions: any;
  constructor(private readonly authService: AuthService) {
    this.cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000 * 30,
      httpOnly: true,
      sameSite: 'Strict',
    };
  }

  setCookies(data, res) {
    if (data?.tokens?.refreshToken) {
      res?.cookie('refreshToken', data.tokens.refreshToken, this.cookieOptions);
      return { ...data, tokens: data.tokens.accessToken };
    } else {
      throw Errors.undefinedError();
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res) {
    const data = await this.authService.login(loginDto);
    return this.setCookies(data, res);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Res({ passthrough: true }) res) {
    const data = await this.authService.signup(signupDto);
    return this.setCookies(data, res);
  }
}
