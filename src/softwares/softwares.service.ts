import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSoftwaresDto } from './dto/create-softwares.dto';
import { DeleteSoftwareDto } from './dto/delete-software.dto';
import { Software } from './entities/software.entety';

@Injectable()
export class SoftwareService {
  constructor(
    @InjectRepository(Software)
    private softwareRepository: Repository<Software>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(loggedUserId: string, createSoftwaresDto: CreateSoftwaresDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: loggedUserId,
      },
    });

    const softwares = new Software();
    softwares.title = createSoftwaresDto.title;
    softwares.link = createSoftwaresDto.link;
    softwares.description = createSoftwaresDto.description;
    softwares.tags = createSoftwaresDto.tags;
    softwares.user = user;

    return this.softwareRepository.save(softwares);
  }

  async findAll(loggedUserId: string) {
    const userSoftwares = await this.softwareRepository.find({
      where: {
        user: loggedUserId,
      },
    });

    if (!userSoftwares.length) {
      throw new HttpException(
        'You dont have any software ',
        HttpStatus.BAD_REQUEST,
      );
    }

    userSoftwares.map((el) => delete el.user);

    return userSoftwares;
  }
  async remove(loggedUserId: string, deleteSoftwareDto: DeleteSoftwareDto) {
    const software = await this.softwareRepository.findOne({
      where: {
        id: deleteSoftwareDto.id,
      },
    });

    if (software.user.id !== loggedUserId) {
      throw new HttpException('You dont have permission for delete this', 403);
    }
    await this.softwareRepository.delete(deleteSoftwareDto.id);
  }
}
