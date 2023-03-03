import { hash, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Errors } from 'src/utils';
import { JwtService } from '@nestjs/jwt/dist';

import { Users, UsersDocument } from '../users/users.schema';
import { Token, TokenDocument } from './token.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Config } from 'src/modules';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: Users;
  tokens: ITokens;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async signup(signupDto: SignupDto): Promise<IAuthResponse> {
    const emailIsExist = await this.usersModel.findOne({
      email: signupDto.email,
    });
    const tagIsExist = await this.usersModel.findOne({ tag: signupDto.tag });

    if (emailIsExist)
      throw Errors.badRequest('User with this email already exists');

    if (tagIsExist)
      throw Errors.badRequest('User with this tag already exists');

    const hashPassword = await hash(signupDto.password, 7);
    const createdUser = await this.usersModel.create({
      ...signupDto,
      password: hashPassword,
      createdAt: Date.now(),
    });

    const tokens = await this.generateAndSaveTokens(createdUser);
    return { user: createdUser, tokens };
  }

  async login(loginDto: LoginDto): Promise<IAuthResponse> {
    const user = await this.usersModel.findOne({ tag: loginDto.tag });

    if (!user) throw Errors.notFound('User');
    const isPassEqual = await compare(loginDto.password, user.password);
    if (!isPassEqual) throw Errors.badRequest('Password is wrong');

    const tokens = await this.generateAndSaveTokens(user);
    return { user, tokens };
  }

  async generateTokens({ _id, email, tag }: UsersDocument): Promise<ITokens> {
    const payload = { email, _id, tag };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: Config.accessSecret,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: Config.refreshSecret,
    });

    return { accessToken, refreshToken };
  }

  async saveTokens(userID: string, refreshToken: string): Promise<void> {
    const token = await this.tokenModel.findOne({ userID });

    if (token) {
      token.refreshToken = refreshToken;
      await token.save();
    } else {
      await this.tokenModel.create({ userID, refreshToken });
    }
  }

  async generateAndSaveTokens(user: UsersDocument): Promise<ITokens> {
    const tokens = await this.generateTokens(user);
    await this.saveTokens(user?._id + '', tokens.refreshToken);

    return tokens;
  }

  async deleteToken(obj: {
    userID?: string;
    refreshToken?: string;
  }): Promise<void> {
    await this.tokenModel.findOneAndDelete(obj);
  }

  async validateToken(token: string, isRefresh?: boolean) {
    try {
      return await this.jwtService.verify(token, {
        secret: isRefresh ? Config.refreshSecret : Config.accessSecret,
      });
    } catch (error) {
      return false;
    }
  }

  async getToken(refreshToken: string): Promise<TokenDocument | null> {
    try {
      return await this.tokenModel.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }

  async refresh(refreshToken: string): Promise<IAuthResponse> {
    if (!refreshToken) {
      throw Errors.unauthorized();
    }
    const tokenIsValid = await this.validateToken(refreshToken, true);
    const tokenData = await this.getToken(refreshToken);

    if (!tokenData || !tokenIsValid) {
      throw Errors.unauthorized();
    }

    const user = await this.usersModel.findById(tokenData.userID);
    const tokens = await this.generateAndSaveTokens(user);

    return { tokens, user };
  }
}
