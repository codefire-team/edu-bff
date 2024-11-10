import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/')
@ApiTags('Api Status')
export class RootController {
  @Get()
  root() {
    return {
      status: 'ok',
    };
  }

  @Get('/health')
  health() {
    return {
      service: 'Edu Api',
      status: 'ok',
      poweredBy: 'André Brito, Giovanna Moeller, João Gabriel Valentim',
    };
  }
}
