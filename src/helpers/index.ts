import * as jwt from 'jsonwebtoken';

export const decodeJwt = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) reject(err);
      if (decoded) resolve(decoded);
    });
  });
