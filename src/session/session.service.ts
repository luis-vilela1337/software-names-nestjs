import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ignoreElements, throwError } from 'rxjs';
import BCryptHashProvider from 'src/providers/hashProvider';
import JWTProvider from 'src/providers/jwtProvider';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bcryptHashProvider: BCryptHashProvider,
    private jwtProvider: JWTProvider,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const hasUser = await this.userRepository.findOne({
      where: {
        email: createSessionDto.email,
      },
    });

    if (!hasUser) {
      throw new HttpException('Wrong credential', 403);
    }

    const comparePasswords = await this.bcryptHashProvider.compare(
      createSessionDto.password,
      hasUser.password,
    );

    if (!comparePasswords) {
      throw new HttpException('Wrong credential', 403);
    }
    const token = this.jwtProvider.generateToken(hasUser.id);

    return {
      user: hasUser,
      token,
    };
  }
}
