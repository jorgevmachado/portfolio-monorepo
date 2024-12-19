import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { CredentialsAuthDto } from './dto/credentials-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './users/user.entity';
import { GetUserAuth } from './decorators/auth-user.decorator';
import { AuthRoleGuards } from './guards/auth-role.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('signIn')
  signIn(@Body() credentialsAuthDto: CredentialsAuthDto) {
    return this.authService.signIn(credentialsAuthDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AuthRoleGuards)
  findOne(@GetUserAuth() user: User, @Param('id') id: string) {
    return this.authService.findOne(id, user);
  }
}
