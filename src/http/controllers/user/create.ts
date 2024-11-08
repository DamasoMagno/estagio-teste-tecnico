import { Request, Response } from "express"
import { z } from "zod"
import { db } from "../../../server";
import { hash } from "bcryptjs";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const userSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { email, name, password } = userSchema.parse(req.body)

      const password_hashed = await hash(password, 8)

      const user = await db.collection("user").insertOne({
        email,
        name,
        password_hashed
      })

      res.status(201).json(user)
    } catch (error) {
      console.log(error)
    }
  }
}