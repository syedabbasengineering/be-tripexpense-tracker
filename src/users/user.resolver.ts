import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterResponse } from './dto/register-response.dto'; // ✅ Import new response DTO
import { NewUserDTO } from './dto/new-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  async getUserById(@Args('id', { type: () => String }) id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Query(() => [User])
  async findManyByFirstname(@Args('firstname', { type: () => String }) firstname: string): Promise<User[]> {
    const users = await this.userService.findManyByFirstname(firstname);
    if (!users.length) {
      throw new NotFoundException(`No users found with first name: ${firstname}`);
    }
    return users;
  }

  @Mutation(() => RegisterResponse) // ✅ Define return type explicitly
  async register(@Args('newUserDTO') newUserDTO: NewUserDTO): Promise<RegisterResponse> {
    return await this.userService.register(newUserDTO);
  }
}