import express from 'express'
import { createInvoice, generateInvoice, getInvoiceData, getInvoices } from '../Controller/InvoiceController.js'
import { Validate } from '../MiddleWare/Validations.js'
import { createteInvoice, generateinvoice } from '../Validations/Invoice.Validators.js'
const router=express.Router()
router.post('/generate',Validate(generateinvoice),generateInvoice)
router.get('/',getInvoices)
router.post('/create',Validate(createteInvoice),createInvoice)
router.get('/get-invoice/:id',getInvoiceData)
export default router