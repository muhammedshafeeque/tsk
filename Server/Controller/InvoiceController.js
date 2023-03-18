import { createRandomInvoice } from "../Logic/Invoice.js";
import { getAllinvoices, insertInvoice } from "../Services/invoice.Service.js";

export const generateInvoice = async (req, res) => {
  try {
    let invoice=await  createRandomInvoice(req.body,req.user)
    await insertInvoice(invoice)
    res.send(invoice)
  } catch (error) {
    res.status(500).send('err'+error)
  }
};
export const getInvoices=async(req,res)=>{
  try {
    let invoices =await getAllinvoices(req.query,req.user)
    res.send(invoices)
  } catch (error) {
    res.status(500).send('err'+error)
  }
}
