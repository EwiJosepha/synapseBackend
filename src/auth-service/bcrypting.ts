import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_EXPIRATION_TIME, JWT_SECRET, SALT_ROUNDS } from "../utils/constant"


export const AuthServices = {
  async hashPassword(password) {
    console.log('SALT_ROUNDS:', SALT_ROUNDS);

    return await bcrypt.hash(password, Number(SALT_ROUNDS))
  },

  async matchPassword(password, checkedPassword) {
    return await bcrypt.compare(password, checkedPassword)
  },

  jwtSignUser(user) {
    return jwt.sign({ ...user }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME })
  },

  jwtVerifyUser(token) {
    console.log("Attempting to verify token");
    console.log("JWT_SECRET in jwtVerifyUser:", JWT_SECRET);
    console.log("Token to verify:", token);

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(token);
      
      console.log("Successfully decoded token:", decoded);
      return decoded;
    } catch (error) {
      console.error("Error verifying token:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      const decodedWithoutVerification = jwt.decode(token);
      console.log("Token decoded without verification:", decodedWithoutVerification);

      return null;
    }
  }
}

