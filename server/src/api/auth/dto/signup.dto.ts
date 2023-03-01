import { ILoginDto, LoginDto } from './login.dto';

export interface ISignupDto extends ILoginDto {
  email: string;
}

export class SignupDto extends LoginDto {
  email: string;

  constructor({ email, password, tag }: ISignupDto) {
    super({ password, tag });
    this.email = email;
  }
}
