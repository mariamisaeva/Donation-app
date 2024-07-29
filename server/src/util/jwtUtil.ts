import jwt from 'jsonwebtoken';
import { Response } from 'express';

const secretKey: string = process.env.JWT_SECRET_KEY as string;

if (!secretKey) {
  throw new Error('JWT_SECRET_KEY is not defined');
}

//Generate JWT-Token
export const generateToken = (payload: object): string => {
  console.log('PAYLOAD: ', payload);
  const token = jwt.sign(payload, secretKey);
  console.log('TOKEN: ', token);
  return token;
};

//Verify JWT-Token
export const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};

//Verify JWT-Token And Extract Amount
export const verifyTokenAndExtractAmount = (
  token: string,
  res: Response,
): number | void => {
  try {
    const decoded = verifyToken(token) as { amount: number };
    return decoded.amount;
  } catch (err) {
    res.status(500).json({ Error: 'Invalid Token!' });
  }
};
