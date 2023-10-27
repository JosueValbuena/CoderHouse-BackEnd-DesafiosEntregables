import { Router } from "express";
import userRouter from "./users/users.routes.js";

const router = Router();

router.use('/user', userRouter);

export default router;