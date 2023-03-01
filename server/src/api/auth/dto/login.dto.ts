export interface ILoginDto {
  password: string;
  tag: string;
}

export class LoginDto {
  password: string;
  tag: string;

  constructor({ password, tag }: ILoginDto) {
    this.password = password;
    this.tag = tag;
  }
}
