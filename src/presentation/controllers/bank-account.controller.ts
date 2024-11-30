import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateBankAccountDto } from '@application/bank-account/dto/create-bank-account.dto';
import { CreateBankAccountUseCase } from '@application/bank-account/usecases/create-bank-account.usecase';
import { GetBankAccountUseCase } from '@application/bank-account/usecases/get-bank-account.usecase';
import { UpdateBankAccountDto } from '@application/bank-account/dto/update-bank-account.dto';
import { UpdateBankAccountUseCase } from '@application/bank-account/usecases/update-bank-account.usecase';
import { CreateBankAccountSwagger } from '@presentation/swagger/bank-account/create-bank-account.swagger';
import { GetBankAccountSwagger } from '@presentation/swagger/bank-account/get-bank-account.swagger';
import { UpdateBankAccountSwagger } from '@presentation/swagger/bank-account/update-bank-account.swagger';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentClient } from '@domain/common/auth/decorators/current-client.decorator';
import { ClientEntity } from '@domain/client/entities/client.entity';

@ApiBearerAuth()
@ApiTags('Bank Account')
@Controller({ path: 'bank-account', version: '1' })
export class BankAccountController {
  constructor(
    private readonly createBankAccountUseCase: CreateBankAccountUseCase,
    private readonly getBankAccountUseCase: GetBankAccountUseCase,
    private readonly updateBankAccountUseCase: UpdateBankAccountUseCase,
  ) {}

  @Get(':id')
  @GetBankAccountSwagger()
  getHello(@Param('id') id: string) {
    return this.getBankAccountUseCase.execute(id);
  }

  @Post()
  @CreateBankAccountSwagger()
  createBankAccount(
    @Body() body: CreateBankAccountDto,
    @CurrentClient() client: ClientEntity,
  ) {
    return this.createBankAccountUseCase.execute(body, client.id);
  }

  @Patch()
  @UpdateBankAccountSwagger()
  updateBankAccount(@Body() body: UpdateBankAccountDto) {
    return this.updateBankAccountUseCase.execute(body);
  }
}
