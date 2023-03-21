import express from 'express'
import { makePayment, verifyPayment } from '../Controller/Payment.Controller.js'
import { Validate } from '../MiddleWare/Validations.js'
import { verifyUser } from '../MiddleWare/VerifyUser.js'
import { paymentValidation } from '../Validations/payment.Validation.js'
const router=express.Router()
router.post('/',verifyUser,Validate(paymentValidation),makePayment)
router.get('/verify-payement',verifyPayment)
export default router