import express from "express";
import cors from "cors";

const app = express();

import { connectToDatabase } from "./database/connect";

import { userRouter } from "./http/controllers/user";
import { productRouter } from "./http/controllers/product";


app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/product', productRouter)


connectToDatabase().then(() => {
  app.listen(3333, () => console.log('Server is running'))
});
