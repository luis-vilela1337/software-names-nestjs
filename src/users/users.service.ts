import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BCryptHashProvider from 'src/providers/hashProvider';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { User, UserFunction } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bcryptHashProvider: BCryptHashProvider,
  ) {}

  async create(loggedUser: string, createUserDto: CreateUserDto) {
    const userAdmin = await this.userRepository.findOne({
      where: {
        id: loggedUser,
        function: UserFunction.ADMIN,
      },
    });

    if (!userAdmin) {
      throw new HttpException('Does not have permission', HttpStatus.FORBIDDEN);
    }

    if (
      UserFunction.ADMIN == createUserDto.function ||
      !Object.values(UserFunction).includes(createUserDto.function)
    ) {
      throw new HttpException('Invalid user function', HttpStatus.FORBIDDEN);
    }

    const hasUserEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (hasUserEmail) {
      throw new HttpException('E-mail already in use', HttpStatus.FORBIDDEN);
    }

    const hasUserPhone = await this.userRepository.findOne({
      where: {
        phone: createUserDto.phone,
      },
    });

    if (hasUserPhone) {
      throw new HttpException(
        'Phone number already in use',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await this.bcryptHashProvider.generate(
      createUserDto.password,
    );
    user.phone = createUserDto.phone;
    user.function = createUserDto.function;

    return this.userRepository.save(user);
  }

  async findOne(loggedUser: string, { id }: FindUserDto) {
    const userAdmin = await this.userRepository.findOne({
      where: {
        id: loggedUser,
        function: UserFunction.ADMIN,
      },
    });

    if (!userAdmin && loggedUser != id) {
      throw new HttpException('Does not have permission', HttpStatus.FORBIDDEN);
    }

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findAll(loggedUser: string) {
    const userAdmin = await this.userRepository.findOne({
      where: {
        id: loggedUser,
        function: UserFunction.ADMIN,
      },
    });

    if (!userAdmin) {
      throw new HttpException('Does not have permission', HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.find({
      where: {
        id: Not(userAdmin.id),
      },
    });
  }
}
