import Jwt from "jsonwebtoken";

const { SECRET } = process.env;

export function accessToken(user: object, expiresIn = '60m') {
  return Jwt.sign(user, SECRET!, { expiresIn });
}

export function refreshToken(user: object) {
  return Jwt.sign(user, SECRET!);
}

export function decodeToken(token: string) {
  return new Promise((resolve, reject) =>
    Jwt.verify(token, SECRET!, (err, user: any) => {
      if (err) reject(err);
      const { iat, exp, ...data } = user;
      if (data._doc)
        resolve(data._doc);
      resolve(data);
    }) as any
  );
}