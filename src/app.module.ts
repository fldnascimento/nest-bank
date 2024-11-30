import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import appplication from '@application/index';
import domain, { modules } from '@domain/index';
import infrastructure, { models } from '@infrastructure/index';
import presentation from '@presentation/index';

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
    ...modules(process.env.JWT_SECRET),
  ],
  controllers: presentation,
  providers: [...domain, ...infrastructure, ...appplication],
})
export class AppModule {}
