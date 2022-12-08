import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 20;
export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  token: string;

  @Prop()
  displayName: string;

  generateToken: () => void;

  checkPassword: (password: string) => Promise<boolean>;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre<UsersDocument>('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
});

UsersSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UsersSchema.methods.generateToken = function () {
  this.token = nanoid();
};

UsersSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
