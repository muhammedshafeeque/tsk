import express from "express";
import { verifyUser } from "../MiddleWare/VerifyUser.js";
import AuthRouter from "./Auth.Router.js";
import UserRouter from "./User.Router.js";
const router = express.Router();
router.use("/auth", AuthRouter);
router.use('/user',verifyUser,UserRouter)
export default router;
