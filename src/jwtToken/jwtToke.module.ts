/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JWTTokenController } from './jwtToken.controller';
import { JWTTokenService } from './jwtToken.service';


@Module({
    imports: [TypeOrmModule.forFeature([User]),

    JwtModule.register({
        secret: 'secret',
        signOptions: { expiresIn: '1d' }
    })],
    controllers: [JWTTokenController],
    providers: [JWTTokenService],
})
export class JWTTokenModule { }