import { Router } from "express";
import userRouter from "./users/users.routes.js";
import thirdPartyRouter from "./users/thirdParty.Sessions.js";

const router = Router();

router.use('/user', userRouter);
router.use('/user', thirdPartyRouter);

export default router;