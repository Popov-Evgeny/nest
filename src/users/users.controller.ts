import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterUsersDto } from './dto/registerUsers.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersDto } from './dto/users.dto';
import { Request } from 'express';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  @Post()
  register(@Body() createUserDto: RegisterUsersDto): Promise<UsersDto> {
    const user = new this.usersModel({
      email: createUserDto.email,
      password: createUserDto.password,
      displayName: createUserDto.displayName,
    });

    user.generateToken();

    return user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Delete('sessions')
  delete() {
    return { message: 'ok!' };
  }
}
