import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/middleware/auth';
import { CreateSoftwaresDto } from './dto/create-softwares.dto';
import { DeleteSoftwareDto } from './dto/delete-software.dto';
import { SoftwareService } from './softwares.service';

@ApiTags('Software routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('softwares')
export class SoftwareController {
  constructor(private readonly softwareService: SoftwareService) {}

  @ApiBearerAuth()
  @UseGuards(AuthMiddleware)
  @Post('/tools')
  create(@Req() request: any, @Body() createSoftwaresDto: CreateSoftwaresDto) {
    const loggedUserId = request.user.id;
    return this.softwareService.create(loggedUserId, createSoftwaresDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthMiddleware)
  @HttpCode(201)
  @Get('/tools')
  find(@Req() request: any) {
    const loggedUserId = request.user.id;
    return this.softwareService.findAll(loggedUserId);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse({ status: 200, description: 'Ok' })
  @UseGuards(AuthMiddleware)
  @HttpCode(200)
  @Delete('/tools')
  remove(@Req() request: any, @Body() deleteSoftwareDto: DeleteSoftwareDto) {
    const loggedUserId = request.user.id;
    return this.softwareService.remove(loggedUserId, deleteSoftwareDto);
  }
}
