import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UserService) {} // Inject UsersService

  @Post('register')
  async register(@Body() body: { firstName: string; lastName: string; email: string; password: string }) {
    return this.usersService.register(body.firstName, body.lastName, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.usersService.login(body.email, body.password);
  }
}