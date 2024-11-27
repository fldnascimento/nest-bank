import { Controller, Get, Param } from '@nestjs/common';
import { ClientApplicationService } from 'src/application/client/services/client-application.service';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientApplicationService: ClientApplicationService,
  ) {}

  @Get(':id')
  getHello(@Param('id') id: string) {
    return this.clientApplicationService.getClient(id);
  }
}
