import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Scopes } from './scopes.decorator';
import { Scope } from '../enums/scope.enum';
import { ScopesGuard } from '../guards/scopes.guard';
import { ApiForbiddenResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';

export function Auth(scopes?: Scope[]) {
  if (scopes) {
    return applyDecorators(
      Scopes(scopes),
      UseGuards(AuthGuard('jwt'), ScopesGuard),
      ApiBearerAuth('Authorization'),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
      ApiForbiddenResponse({
        description: 'You do not have permission (Scopes)',
      }),
    );
  }
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBearerAuth('Authorization'),
  );
}
