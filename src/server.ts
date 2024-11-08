import express from "express"
import { client } from "./database/mongo";
import { Db, ObjectId } from "mongodb";
import { z } from "zod"
const app = express();

let db: Db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('api_estagio'); // Substitua pelo nome do seu banco de dados
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    messaage: "Hello Word"
  })
})

app.post("/", async (req, res) => {
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
    res.status(400).json({
      message: error
    })
  }
})

app.get("/", async (req, res) => {
  try {
    const products = db.collection("product").find();
    res.status(201).json(products)
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
})

app.patch("/:productId", async (req, res) => {
  try {
    const productSchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      price: z.coerce.number().positive().optional(),
      quantity: z.coerce.number().positive().optional(),
    })

    const { productId } = req.params
    const product = productSchema.parse(req.body)


    const products = db.collection("product").updateOne({
      _id: new ObjectId(productId)
    }, {
      $set: product
    });

    res.status(201).json(products)
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
})


connectToDatabase().then(() => {
  app.listen(3333, () => console.log('Server is running'))
});
