import { Request, Response } from "express"
import { z } from "zod"
import { db } from "../../../database/connect";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    try {
      const searchProductSchema = z.object({
        name: z.string().optional(),
      })

      const { name } = searchProductSchema.parse(req.query)

      const products = await db.collection("product").find({
        ...(name && {
          "name": {
            $regex: name,
            $options: 'i'
          }
        })
      }).toArray();
      res.status(200).json(products)
    } catch (error) {
      console.log(error)

      res.status(400).json({
        message: error
      })
    }
  }
}