import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Scope } from '../enums/scope.enum';
import { User } from 'src/modules/auth/user.entity';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const scopes =
      this.reflector.get<Scope[]>('scopes', context.getHandler()) ||
      this.reflector.get<Scope[]>('scopes', context.getClass());

    if (!scopes || !scopes.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const hasScope = () =>
      scopes.some(scope => user.scopes?.some(userScope => userScope === scope));

    if (user && user.scopes && hasScope()) {
      return true;
    }

    throw new ForbiddenException('Forbidden');
  }
}
