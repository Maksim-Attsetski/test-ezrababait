export class CreateUserDto {
  email: string;
  password: string;
  tag: string;

  constructor({
    email,
    password,
    tag,
  }: {
    email: string;
    password: string;
    tag: string;
  }) {
    this.email = email;
    this.password = password;
    this.tag = tag;
  }
}
