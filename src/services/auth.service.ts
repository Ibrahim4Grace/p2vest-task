import jwt from 'jsonwebtoken';
import config from '../config';
import AppDataSource from '../data-source';
import { Conflict, HttpError } from '../middleware';
import { User } from '../models';
import { IUserLogin, IUserSignUp } from '../types';
import { comparePassword, hashPassword } from '../utils';
import { sendUser } from '../utils/senduser';

/**
 * AuthService handles authentication-related operations.
 */

export class AuthService {
  /**
   * Registers a new user and sends an OTP for verification.
   *
   * @param payload - The user sign-up payload containing user details.
   * @returns A promise that resolves to an object containing the status message, user details, and access token.
   * @throws Conflict - If the user already exists.
   * @throws HttpError - For other errors, such as database issues.
   */
  public async signUp(payload: IUserSignUp): Promise<{
    message: string;
    user: Partial<User>;
    access_token: string;
  }> {
    const { name, email, password } = payload;

    const [firstname = '', lastname = ''] = name.split(' ');

    try {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        throw new Conflict('User already exists');
      }

      const hashedPassword = await hashPassword(password);
      const user = new User();
      user.first_name = firstname;
      user.last_name = lastname;
      user.email = email;
      user.password = hashedPassword;

      const createdUser = await AppDataSource.manager.save(user);
      const access_token = jwt.sign(
        { userId: createdUser.id },
        config.TOKEN_SECRET,
        {
          expiresIn: '1d',
        }
      );

      const userResponse = sendUser(user);

      return {
        user: userResponse,
        access_token,
        message: 'User Created Successfully.',
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(error.status || 500, error.message || error);
    }
  }

  public async login(
    payload: IUserLogin
  ): Promise<{ message: string; user: Partial<User>; access_token: string }> {
    const { email, password } = payload;

    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw new HttpError(401, 'Invalid credentials');
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new HttpError(401, 'Invalid credentials');
      }

      const access_token = jwt.sign({ userId: user.id }, config.TOKEN_SECRET, {
        expiresIn: '1d',
      });

      const userResponse = sendUser(user);

      return {
        user: userResponse,
        access_token,
        message: 'Login successful',
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(error.status || 500, error.message || error);
    }
  }
}
