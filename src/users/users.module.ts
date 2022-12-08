import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalStrategy } from '../../local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from './schemas/users.schema';

@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    PassportModule,
  ],
})
export class UserModule {}
