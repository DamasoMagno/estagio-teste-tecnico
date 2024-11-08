import { Router } from "express"
export const productRouter = Router()

import { ListProductsController } from "./list"
import { CreateProductController } from "./create"
import { DeleteProductController } from "./delete"
import { GetProduct } from "./get"
import { UpdateProductController } from "./update"

const listProductsController = new ListProductsController();
const createProductController = new CreateProductController();
const deleteProductController = new DeleteProductController();
const getProductController = new GetProduct();
const updateProductController = new UpdateProductController();

productRouter.get('/', listProductsController.handle)
productRouter.get('/:productId', getProductController.handle)
productRouter.post('/', createProductController.handle)
productRouter.patch('/:productId', updateProductController.handle)
productRouter.delete('/:productId', deleteProductController.handle)