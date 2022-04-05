import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/middleware/auth';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('User routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthMiddleware)
  @Post()
  create(@Req() request: any, @Body() createUserDto: CreateUserDto) {
    const loggedUser = request.user.id;
    return this.usersService.create(loggedUser, createUserDto);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'uuid',
    example: '84985d78-6510-4586-ae48-3c234026d1dd',
  })
  @UseGuards(AuthMiddleware)
  @Get(':id')
  findOne(@Req() request: any, @Param('id') id: string) {
    const loggedUser = request.user.id;
    return this.usersService.findOne(loggedUser, { id });
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthMiddleware)
  findAll(@Req() request: any) {
    const loggedUser = request.user.id;
    return this.usersService.findAll(loggedUser);
  }
}
