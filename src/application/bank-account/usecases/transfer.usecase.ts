import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { BankAccountService } from '@domain/bank-account/interfaces/services/bank-account.service';
import { UseCase } from '@domain/common/application/usecase';
import { Inject, Injectable } from '@nestjs/common';
import { TransferDto } from '@application/bank-account/dto/transfer.dto';

@Injectable()
export class TransferUseCase
  implements UseCase<TransferDto, BankAccountEntity>
{
  constructor(
    @Inject('BankAccountService')
    private readonly bankAccountService: BankAccountService,
  ) {}

  async execute(transferDto: TransferDto): Promise<BankAccountEntity> {
    return this.bankAccountService.transfer(
      transferDto.fromAccountNumber,
      transferDto.toAccountNumber,
      transferDto.amount,
    );
  }
}
