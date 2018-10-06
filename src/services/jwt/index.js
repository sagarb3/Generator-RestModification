import jwt from "jsonwebtoken";
import Promise from "bluebird";
import { jwtSecret, jwtExpiryInterval } from "../../config";

const jwtSign = Promise.promisify(jwt.sign);
const jwtVerify = Promise.promisify(jwt.verify);

export const sign = (id, options, method = jwtSign) =>
  method({ id }, jwtSecret, options);

export const signSync = (id, options) => sign(id, options, jwt.sign);

export const verify = token => jwtVerify(token, jwtSecret);

export const userToken = params => {
  const encodedParams = {
    id: params.id,
    type: params.type,
    sessionToken: params.sessionToken,
    partnerCode: params.partnerCode,
    channelCode: params.channelCode
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      { encodedParams },
      jwtSecret,
      { expiresIn: jwtExpiryInterval.expiryTime },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
