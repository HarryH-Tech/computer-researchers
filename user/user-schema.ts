import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';

export const User = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // confirmPassword: {
  //   type: String,
  //   required: true,
  // },

  hashedPassword: {
    type: String,
    required: true,
    default: '0',
  },

  role: {
    type: Number,
    default: 0,
  },

  salt: {
    type: String,
  },
});

//virtual field
User.virtual('password')
  .set(function (this: IUser, password: string) {
    console.log('password = ' + password);
    this._password = this.password;
    this.salt = 'ubIJNKHUYIjkioj';
    this.hashedPassword = this.encryptPassword(password);
  })

  .get(function (this: IUser) {
    console.log(this._password);
    return this._password;
  });

//creating methods that will be used by the schema
User.methods = {
  authenticate: function (plainText: any) {
    // this.hashedPassword = plainText + 'random_hash123';
    console.log('Hashed password = ' + this.hashedPassword);
    console.log('encrypted password = ' + this.encryptPassword(plainText));
    console.log(
      'Login permitted = ' + bcrypt.compareSync(plainText, this.hashedPassword)
    );
    return bcrypt.compareSync(plainText, this.hashedPassword);
  },

  //function that will use a built in algorithm to encrypt user password
  encryptPassword: function (password: string) {
    if (!password) return '';
    try {
      let hash = bcrypt.hashSync(password, 2);

      return hash;
    } catch (err) {
      return '0';
    }
  },
};

const UserModel = mongoose.model('User', User);
export default UserModel;
