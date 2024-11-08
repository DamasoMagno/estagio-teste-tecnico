import { Request, Response } from "express"
import { z } from "zod"
import { db } from "../../../database/connect";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    try {
      const productSchema = z.object({
        name: z.string(),
        description: z.string(),
        price: z.coerce.number().positive(),
        quantity: z.coerce.number().positive().default(0),
      })

      const { name, description, price, quantity } = productSchema.parse(req.body)

      const product = await db.collection("product").insertOne({
        name,
        description,
        price,
        quantity
      });

      res.status(201).json(product)
    } catch (error) {
      console.log(error)

      res.status(400).json({
        message: error
      })
    }
  }
}