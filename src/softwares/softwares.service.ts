import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSoftwaresDto } from './dto/create-softwares.dto';
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
}
