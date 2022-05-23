/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class JWTTokenService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async register(data : any):Promise<User>{
        return this.userRepository.save(data);
    }

    async login(condition : any):Promise<User>{
        return this.userRepository.findOne(condition);
    }

}
