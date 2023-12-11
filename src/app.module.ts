import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from './tickets/tickets.module';
import { BussinessModule } from './bussiness/bussiness.module';
import { ToolsModule } from './tools/tools.module';
import { TypesOfMaterialModule } from './types-of-material/types-of-material.module';
import { DescriptionOfMaterialModule } from './description-of-material/description-of-material.module';
import { StatusDevolutionModule } from './status-devolution/status-devolution.module';
import { StatusReceivedModule } from './status-received/status-received.module';
import { StatusFinishedModule } from './status-finished/status-finished.module';
import { StatusValidationModule } from './status-validation/status-validation.module';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';
import { GatewayModule } from './gateway/gateway.module';

config(); // Carga las variables de entorno desde el archivo .env

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsersModule,
    TicketsModule,
    BussinessModule,
    ToolsModule,
    TypesOfMaterialModule,
    DescriptionOfMaterialModule,
    StatusDevolutionModule,
    StatusReceivedModule,
    StatusFinishedModule,
    StatusValidationModule,
    AuthModule,
    GatewayModule,
  ],
})
export class AppModule {}
