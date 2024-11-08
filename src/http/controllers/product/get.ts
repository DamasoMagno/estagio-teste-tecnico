import { Request, Response } from "express"
import { z } from "zod"
import { db } from "../../../database/connect";
import { ObjectId } from "mongodb";

export class GetProduct {
  async handle(req: Request, res: Response) {
    try {
      const searchProductSchema = z.object({
        productId: z.string().optional(),
      })

      const { productId } = searchProductSchema.parse(req.params)

      const product = await db.collection("product").findOne({ _id: new ObjectId(productId) });
      res.status(200).json(product)
    } catch (error) {
      console.log(error)

      res.status(400).json({
        message: error
      })
    }
  }
}