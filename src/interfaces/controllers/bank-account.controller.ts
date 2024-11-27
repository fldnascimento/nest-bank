import { Controller, Get, Param } from '@nestjs/common';
import { BankAccountApplicationService } from 'src/application/bank-account/services/bank-account-application.service';

@Controller('bank-account')
export class BankAccountController {
  constructor(
    private readonly bankAccountApplicationService: BankAccountApplicationService,
  ) {}

  @Get(':id')
  getHello(@Param('id') id: string) {
    return this.bankAccountApplicationService.getAccountById(id);
  }
}
