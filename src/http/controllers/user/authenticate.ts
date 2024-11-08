import { Request, Response } from "express"
import { z } from "zod"
import { db } from "../../../server";
import { ObjectId } from "mongodb";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuhenticateUserController {
  async handle(req: Request, res: Response) {
    try {
      const userSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { email, password } = userSchema.parse(req.body)

      const user = await db.collection("user").findOne({
        email,
      })

      if (!user) {
        res.status(400).json({
          error: "Email/senha incorretos"
        })

        return
      }

      const passwordIsValid = await compare(password, user.password_hashed)

      if (!passwordIsValid) {
        res.status(400).json({
          error: "Email/senha incorretos"
        })

        return
      }

      const token = sign({}, "teste", {
        subject: user.email,
        expiresIn: "7d"
      })
      res.status(201).json({ user, token })
    } catch (error) {
      console.log(error)
    }
  }
}