import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './users/user.module';
import { ExpenseModule } from './expenses/expense.module';
import { TripModule } from './trips/trip.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // ✅ Ensure environment variables are loaded

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true, // ✅ Use only in development
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),

    UserModule,
    ExpenseModule,
    TripModule,
  ],
})
export class AppModule {}