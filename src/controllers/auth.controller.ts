import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler, sendJsonResponse } from '../helper';

const authService = new AuthService();

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { user, access_token, message } = await authService.signUp(req.body);
  sendJsonResponse(res, 201, message, { user, access_token });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { access_token, user } = await authService.login({ email, password });
  sendJsonResponse(res, 200, 'Login successful', user, access_token);
});
