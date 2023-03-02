import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/api/auth/auth.service';
import { Errors } from 'src/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const tokenWithBearer = req?.headers?.authorization?.split(' ');
      const bearer = tokenWithBearer[0] || '';
      const token = tokenWithBearer[1] || '';

      if (bearer !== 'Bearer' || !token) {
        throw Errors.unauthorized();
      }
      const user = await this.authService.validateToken(token, true);

      req.user = user;
      return true;
    } catch (error) {
      console.log(error);
      throw Errors.unauthorized();
    }
  }
}
