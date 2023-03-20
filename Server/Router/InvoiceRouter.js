import express from 'express'
import { createInvoice, generateInvoice, getInvoices } from '../Controller/InvoiceController.js'
import { Validate } from '../MiddleWare/Validations.js'
import { createteInvoice, generateinvoice } from '../Validations/Invoice.Validators.js'
const router=express.Router()
router.post('/generate',Validate(generateinvoice),generateInvoice)
router.get('/',getInvoices)
router.post('/create',Validate(createteInvoice),createInvoice)
export default router