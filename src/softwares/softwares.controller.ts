import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/middleware/auth';
import { CreateSoftwaresDto } from './dto/create-softwares.dto';
import { SoftwareService } from './softwares.service';

@ApiTags('Software routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('softwares')
export class SoftwaresController {
  constructor(private readonly softwareService: SoftwareService) {}

  @ApiBearerAuth()
  @UseGuards(AuthMiddleware)
  @Post()
  create(@Req() request: any, @Body() createSoftwaresDto: CreateSoftwaresDto) {
    const loggedUserId = request.user.id;
    return this.softwareService.create(loggedUserId, createSoftwaresDto);
  }
}
