import {Body, Controller, Post, UseGuards, Request, Get, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {AuthGuard} from "@nestjs/passport";
import {Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {
    }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    signIn(@Request() req, @Res() res:Response){
        const jwt = req.user;
        res.setHeader('Set-Cookie',[jwt]).json();

    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    profile(@Request() req){
        return req.user;
    }
}
