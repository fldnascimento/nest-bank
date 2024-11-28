import { Inject, Injectable } from '@nestjs/common';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { BankAccountService } from '@domain/bank-account/interfaces/services/bank-account.service';
import { UseCase } from '@domain/common/application/usecase';
import { UpdateBankAccountDto } from '@application/bank-account/dto/update-bank-account.dto';

@Injectable()
export class UpdateBankAccountUseCase
  implements UseCase<UpdateBankAccountDto, BankAccountEntity>
{
  constructor(
    @Inject('BankAccountService')
    private readonly bankAccountService: BankAccountService,
  ) {}

  async execute(
    bankAccountDto: UpdateBankAccountDto,
  ): Promise<BankAccountEntity> {
    return this.bankAccountService.updateActive(
      bankAccountDto.accountNumber,
      bankAccountDto.isActive,
    );
  }
}
