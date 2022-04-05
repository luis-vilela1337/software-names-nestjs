import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BCryptHashProvider from 'src/providers/hashProvider';
import JWTProvider from 'src/providers/jwtProvider';
import { User } from 'src/users/entities/user.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SessionController],
  providers: [SessionService, BCryptHashProvider, JWTProvider],
})
export class SessionModule {}
