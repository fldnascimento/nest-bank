import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { BankAccountService } from 'src/domain/bank-account/services/bank-account.service';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';

@Injectable()
export class CreateBankAccountUseCase {
  constructor(private readonly bankAccountService: BankAccountService) {}

  async execute(
    bankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccountEntity> {
    return this.bankAccountService.createAccount(
      BankAccountEntity.new(bankAccountDto),
    );
  }
}
