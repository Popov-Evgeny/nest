import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../users/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.get('Authorization');

    if (!token) return false;

    const user = await this.usersModel.findOne({ token });

    if (!user) return false;

    user.generateToken();

    await user.save();

    req.user = user;

    return true;
  }
}
