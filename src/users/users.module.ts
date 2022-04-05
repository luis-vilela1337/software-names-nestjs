import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BCryptHashProvider from 'src/providers/hashProvider';
import { User } from './entities/users.entety';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, BCryptHashProvider],
})
export class UsersModule {}
