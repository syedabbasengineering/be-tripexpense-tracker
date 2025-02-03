import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { NewUserDTO } from './dto/new-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  findOneById(id: string): User | undefined {
    const user = this.users.find((u) => u.id === id);
    return user;
  }

  findManyByFirstname(firstname: string): User[] {
    const users = this.users.filter((u) => u.firstname === firstname);
    return users.map((user) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      createdDate: user.createdDate,
      age: user.age,
    }));
  }

  addNewUser(user: NewUserDTO): User {
    const newUser: User = {
      ...user,
      createdDate: new Date(),
      id: randomUUID(),
    };
    this.users.push(newUser);
    return newUser;
  }
}
