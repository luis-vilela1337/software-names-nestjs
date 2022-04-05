import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionService } from './session.service';

@ApiTags('Session routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiCreatedResponse({
    schema: {
      allOf: [
        {
          properties: {
            user: {
              example: {
                id: 'string',
                name: 'string',
                email: 'string',
                phone: 'string',
                function: 'admin',
                created_at: '2022-04-05T15:10:48.454Z',
                updated_at: '2022-04-05T15:10:48.454Z',
              },
            },
            token: {
              example: 'string',
            },
          },
        },
      ],
    },
  })
  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }
}
