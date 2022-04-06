import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import JWTProvider from 'src/providers/jwtProvider';

import { User } from 'src/users/entities/user.entity';
import { Software } from './entities/software.entety';
import { SoftwaresController } from './softwares.controller';
import { SoftwareService } from './softwares.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Software]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [SoftwaresController],
  providers: [SoftwareService, JWTProvider],
})
export class SoftwareModule {}
