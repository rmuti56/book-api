import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Scope } from 'src/common/enums/scope.enum';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ICurrentUser } from './interface/curret-user.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.adminLogin(loginDto);
  }

  @Auth([Scope.SUPER_ADMIN])
  @Get('')
  getProfile(@CurrentUser() user: ICurrentUser) {
    return user;
  }
}
