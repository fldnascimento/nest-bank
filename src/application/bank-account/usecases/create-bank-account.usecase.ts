import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { BankAccountService } from '@domain/bank-account/interfaces/services/bank-account.service';
import { UseCase } from '@domain/common/application/usecase';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';

@Injectable()
export class CreateBankAccountUseCase
  implements UseCase<CreateBankAccountDto, BankAccountEntity>
{
  constructor(
    @Inject('BankAccountService')
    private readonly bankAccountService: BankAccountService,
  ) {}

  async execute(
    bankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccountEntity> {
    return this.bankAccountService.createAccount(
      BankAccountEntity.new(bankAccountDto),
    );
  }
}
