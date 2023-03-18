import express from 'express'
import { generateInvoice } from '../Controller/InvoiceController.js'
import { Validate } from '../MiddleWare/Validations.js'
import { generateinvoice } from '../Validations/Invoice.Validators.js'
const router=express.Router()
router.post('/generate',Validate(generateinvoice),generateInvoice)
export default router