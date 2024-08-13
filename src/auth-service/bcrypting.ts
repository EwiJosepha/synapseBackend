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
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch {
      return null
    }
  }

}