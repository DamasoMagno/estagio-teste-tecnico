import { Request, Response } from "express"
import { z } from "zod"
import { db } from "../../../server";
import { ObjectId } from "mongodb";

export class UpdateProductController {
  async handle(req: Request, res: Response) {
    try {
      const productSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.coerce.number().positive().optional(),
        quantity: z.coerce.number().positive().optional(),
      })

      const { productId } = req.params
      const product = productSchema.parse(req.body)


      await db.collection("product").updateOne({
        _id: new ObjectId(productId)
      }, {
        $set: product
      });

      res.status(201).json()
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  }
}