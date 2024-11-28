import { Inject, Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { BankAccountEntity } from 'src/domain/bank-account/entities/bank-account.entity';
import { BankAccountService } from 'src/domain/bank-account/interfaces/services/bank-account.service';
import { UseCase } from 'src/domain/common/application/usecase';

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
