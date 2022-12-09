import { Module } from '@nestjs/common';
import { LocalStrategy } from '../auth/local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from './schemas/users.schema';
import { AuthService } from '../auth/auth.service';

@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    PassportModule,
  ],
  exports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
})
export class UserModule {}
