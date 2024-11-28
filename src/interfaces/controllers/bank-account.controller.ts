import { Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post(':clientId')
  createBankAccount(@Param('clientId') clientId: string) {
    return this.bankAccountApplicationService.createBankAccount(clientId);
  }

  @Post(':id/deposit/:amount')
  deposit(@Param('id') id: string, @Param('amount') amount: number) {
    return this.bankAccountApplicationService.deposit(id, +amount);
  }

  @Post(':id/withdraw/:amount')
  withdraw(@Param('id') id: string, @Param('amount') amount: number) {
    return this.bankAccountApplicationService.withdraw(id, +amount);
  }
}
