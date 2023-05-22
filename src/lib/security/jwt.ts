import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: '4h',
  algorithm: 'HS256',
};

const secretKey: Secret = process.env.SECRET_KEY ?? '';

export function signJwtAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, secretKey, DEFAULT_SIGN_OPTION);
}

export function verifyJwt(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, secretKey, DEFAULT_SIGN_OPTION);
  } catch (error) {
    return null;
  }
}
