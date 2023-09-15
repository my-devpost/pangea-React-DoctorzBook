import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const jwtToken = (payload) => {
  let secret = process.env.TOKEN_SECRET;
  let token = jwt.sign(payload, secret);
  return token;
};

export const hash = function (password, callback) {
  let saltRounds = Number(process.env.SALT_ROUND);
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      callback(err, hash);
    });
  });
};

export const check = (password, hash, callback) => {
  bcrypt.compare(password, hash, (error, check) => {
    callback(error, check);
  });
};

export const hashDate = (date, start, end) => {
  return date + start + end;
};


