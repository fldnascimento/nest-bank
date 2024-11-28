import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { DepositDto } from '../dto/deposit.dto';
import { BankAccountService } from 'src/domain/bank-account/interfaces/services/bank-account.service';
import { UseCase } from 'src/domain/common/application/usecase';

@Injectable()
export class DepositUseCase implements UseCase<DepositDto, BankAccountEntity> {
  constructor(
    @Inject('BankAccountService')
    private readonly bankAccountService: BankAccountService,
  ) {}

  async execute(depositDto: DepositDto): Promise<BankAccountEntity> {
    return this.bankAccountService.deposit(
      depositDto.accountNumber,
      depositDto.amount,
    );
  }
}
