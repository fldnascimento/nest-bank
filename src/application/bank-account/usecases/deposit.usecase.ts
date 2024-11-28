import { Injectable } from '@nestjs/common';
import { BankAccountService } from 'src/domain/bank-account/services/bank-account.service';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { DepositDto } from '../dto/deposit.dto';

@Injectable()
export class DepositUseCase {
  constructor(private readonly bankAccountService: BankAccountService) {}

  async execute(depositDto: DepositDto): Promise<BankAccountEntity> {
    return this.bankAccountService.deposit(
      depositDto.accountNumber,
      depositDto.amount,
    );
  }
}
