import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service'; // Ensure this is imported
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Connect User model to MongoDB
  ],
  providers: [UserResolver, UserService], // Ensure UserService is registered as a provider
  exports: [UserService], // Export UserService for use in other modules
})
export class UserModule {}