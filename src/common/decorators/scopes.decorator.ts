import {SetMetadata, CustomDecorator } from '@nestjs/common';

import { Scope } from '../enums/scope.enum';

export const Scopes = (scopes:  Scope[]): CustomDecorator<string> =>
  SetMetadata('scopes', scopes);
