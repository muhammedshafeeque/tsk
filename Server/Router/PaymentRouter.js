import express from 'express'
import { makePayment } from '../Controller/Payment.Controller.js'
import { Validate } from '../MiddleWare/Validations.js'
import { paymentValidation } from '../Validations/payment.Validation.js'
const router=express.Router()
router.post('/',Validate(paymentValidation),makePayment)
export default router