import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from './entities/user.entity';
import { NewUserDTO } from './dto/new-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOneById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id: Number(id) } });
  }

  async findManyByFirstname(firstname: string): Promise<User[]> {
    return await this.userRepository.find({ where: { firstName: firstname } });
  }

  async register(newUserDTO: NewUserDTO): Promise<{ user: User; token: string }> {
    const existingUser = await this.userRepository.findOne({ where: { email: newUserDTO.email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(newUserDTO.password, 10);
    const newUser = this.userRepository.create({ ...newUserDTO, password: hashedPassword });
    await this.userRepository.save(newUser);
  
    return {
      user: newUser, 
      token: this.generateToken(newUser), // ✅ Ensure this matches `{ token: string }`
    };
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }
  
    return { token: this.generateToken(user) }; // ✅ Wrap token in an object
  }

  private generateToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}