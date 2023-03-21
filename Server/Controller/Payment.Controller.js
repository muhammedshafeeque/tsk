
import { getInvoiceById } from "../Services/invoice.Service.js";
import { checkPaymentSuccess, doPayment} from "../Services/paymnent.Service.js";

export const makePayment = async (req, res) => {
  try {
    let invoice = await getInvoiceById(req.body.id,req.user);
    // let payment=await insertPaymentOption(req.body.id,req.user)
    await doPayment(invoice, req.user);
    res.send("Please check your email to make payment");
  } catch (error) {
    res.staus(400).send("error" + error);
  }
};
export const  verifyPayment=async(req,res)=>{
  try {
    let payement=await checkPaymentSuccess(req.query.payment_id)
    res.send(req.query)
  } catch (error) {
    res.staus(500).send('error'+error)
  }
}
