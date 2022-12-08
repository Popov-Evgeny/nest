import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../users/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async validateUsers(email: string, password: string) {
    const user = await this.usersModel.findOne({ email });

    if (user && (await user.checkPassword(password))) {
      user.generateToken();
      await user.save();

      return user;
    }

    return null;
  }
}
