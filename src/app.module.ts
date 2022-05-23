/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './jwtToken/entity/user.entity';
import { JWTTokenModule } from './jwtToken/jwtToke.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Chelli1@',
    database: 'nest_auth',
    entities: [User],
    synchronize: true,
  }), JWTTokenModule,]
  ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
