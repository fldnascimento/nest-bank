import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { BankAccountModel } from './infrastructure/database/models/bank-account.model';
import { ClientModel } from './infrastructure/database/models/client.model';
import { TransactionModel } from './infrastructure/database/models/transaction.model';
import { BankAccountMapper } from './infrastructure/mappers/bank-account.mapper';
import { ClientMapper } from './infrastructure/mappers/client.mapper';
import { ClientController } from './interfaces/controllers/client.controller';
import { BankAccountController } from './interfaces/controllers/bank-account.controller';
import { ClientImplRepository } from './infrastructure/repositories/client-impl.repository';
import { BankAccountImplRepository } from './infrastructure/repositories/bank-account-impl.repository';
import { BankAccountService } from './domain/bank-account/services/bank-account.service';
import { ClientService } from './domain/client/services/client.service';
import { BankAccountApplicationService } from './application/bank-account/services/bank-account-application.service';
import { CreateClientUseCase } from './application/client/usecases/create-client.usecase';
import { GetClientUseCase } from './application/client/usecases/get-client.usecase';

const mappers = [BankAccountMapper, ClientMapper];
const repositories = [
  {
    provide: 'BankAccountRepository',
    useClass: BankAccountImplRepository,
  },
  {
    provide: 'ClientRepository',
    useClass: ClientImplRepository,
  },
];

const domainServices = [BankAccountService, ClientService];
const usecases = [
  BankAccountApplicationService,
  GetClientUseCase,
  CreateClientUseCase,
];

const models = [BankAccountModel, ClientModel, TransactionModel];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      synchronize: false,
      models: models,
    }),
  ],
  controllers: [AppController, BankAccountController, ClientController],
  providers: [
    ...domainServices,
    ...repositories,
    ...usecases,
    ...mappers,
    AppService,
  ],
})
export class AppModule {}
