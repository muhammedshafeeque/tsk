import express from "express";
import { doLogin, doSignup } from "../Controller/Auth.Controller.js";
import { Validate } from "../MiddleWare/Validations.js";
import { login, signup } from "../Validations/Auth.Validators.js";
const router = express.Router();
router.post("/signup", Validate(signup), doSignup);
router.post("/login", Validate(login),doLogin);
export default router;
