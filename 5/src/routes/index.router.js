import express from "express";
import sessionRouter from "./session.router.js";
const indexRouter = express.Router();

indexRouter.use('/api/sessions', sessionRouter);

export default indexRouter;