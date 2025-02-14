import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { NewUserDTO } from './dto/new-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() newUserDTO: NewUserDTO) {
    return this.userService.register(newUserDTO);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }
}