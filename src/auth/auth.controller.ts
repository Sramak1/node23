import {Body, Controller, Post, UseGuards, Request, Get, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {AuthGuard} from "@nestjs/passport";
import {Response} from "express";
import {LocalAuthGuard} from "./guards/localAuth.guard";
import {jwtAuthGuard} from "./guards/jwtAuth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    signIn(@Request() req, @Res() res:Response){
        const jwt = req.user;
        res.setHeader('Set-Cookie',[jwt]).json();

    }

    @UseGuards(jwtAuthGuard)
    @Get('profile')
    profile(@Request() req){
        return req.user;
    }

    @UseGuards(jwtAuthGuard)
    @Post('logout')
    async logout(@Request() req){
        req.setHeader("Set-Cookie",`Access_token=;HttpOnly;Path=/;Max-Age=0`);
    }
}
