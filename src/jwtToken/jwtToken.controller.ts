/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JWTTokenService } from './jwtToken.service';
import { ApiTags } from '@nestjs/swagger';


@Controller()
@ApiTags("JwtToken")
export class JWTTokenController {

    constructor(
        private readonly jwtTokenService: JWTTokenService,
        private jwtService: JwtService
    ) { }
     userArray:any=[];
    @Post('/register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {

        const hashedPassword = await bcrypt.hash(password, 20)
        const user = await this.jwtTokenService.register({
            name,
            email,
            password: hashedPassword

        });
        delete user.password;
        return user;
    }

    @Post('/login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const user = await this.jwtTokenService.login({ email });
        if (!user) {
            throw new BadRequestException('Invalid Credentials');
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid Credentials');
        }
        const jwt = await this.jwtService.signAsync({ id: user.id });
        console.log("';';", jwt);
        response.cookie('jwt', jwt, { httpOnly: true });
        return {
            message: 'Success'
        }
    }


    // @Get('user')
    // async user(@Req() request: Request) {

    //     const cookie = request.cookies['jwt'];

    //     // const data = await this.jwtService.verifyAsync(cookie);
    //     console.log("jvcbvj", cookie);

    //     return cookie;

    //     // return data;
    // }

    @Get("user")
    async user(@Req() request: Request) {
        try {
            
            const cookie= request.cookies['jwt'];
            cookie.push('asj');
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.jwtTokenService.login({ id: data['id'] }) 
            this.userArray.push(user);
            console.log(this.userArray)
            const { password, ...result } = user;
            return this.userArray;
        }
        catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return {
            message: "success"
        }
    }
}