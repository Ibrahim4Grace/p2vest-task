import { Router } from 'express';
import {  signUp, login } from '../controllers';
import { validateData } from '../middleware';
import { userSignUpSchema, userSigninSchema } from '../schema';

const authRoute = Router();

authRoute.post('/auth/register', validateData(userSignUpSchema), signUp);
authRoute.post('/auth/login', validateData(userSigninSchema), login);

export { authRoute };
