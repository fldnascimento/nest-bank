import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { BankAccountService } from '@domain/bank-account/interfaces/services/bank-account.service';
import { UseCase } from '@domain/common/application/usecase';
import { DepositDto } from '@application/bank-account/dto/deposit.dto';

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
