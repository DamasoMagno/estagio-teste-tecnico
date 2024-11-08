import { Router } from "express"
export const userRouter = Router()

import { CreateUserController } from "./create"
import { AuhenticateUserController } from "./authenticate"

const createUserController = new CreateUserController();
const authenticateUserControler = new AuhenticateUserController();

userRouter.post('/', createUserController.handle)
userRouter.post('/auth', authenticateUserControler.handle)