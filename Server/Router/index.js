import express from "express";
import { verifyUser } from "../MiddleWare/VerifyUser.js";
import AuthRouter from "./Auth.Router.js";
import InvoiceRouter from "./InvoiceRouter.js";
import PaymentRouter from "./PaymentRouter.js";
import UserRouter from "./User.Router.js";
const router = express.Router();
router.use("/auth", AuthRouter);
router.use('/user',verifyUser,UserRouter)
router.use('/invoice',verifyUser,InvoiceRouter)
router.use('/pay',PaymentRouter)
export default router;
