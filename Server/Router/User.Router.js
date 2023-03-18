import express from 'express'
import { sendReqUser } from '../Controller/Auth.Controller.js'
const router=express.Router()
router.get('/req-user',sendReqUser)
export default router