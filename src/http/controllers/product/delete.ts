import { Request, Response } from "express"
import { z } from "zod"
import { db } from "../../../server";
import { ObjectId } from "mongodb";

export class DeleteProductController {
  async handle(req: Request, res: Response) {
    try {
      const { productId } = req.params

      await db.collection("product").deleteOne({ _id: new ObjectId(productId) })

      res.status(201).json()
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  }
}