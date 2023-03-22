import {
  getInvoiceById,
  updateInvoiceStatus,
} from "../Services/invoice.Service.js";
import {
  checkPaymentSuccess,
  doPayment,
  gentPaymentData,
} from "../Services/paymnent.Service.js";

export const makePayment = async (req, res) => {
  try {
    let invoice = await getInvoiceById(req.body.id, req.user);
    await doPayment(invoice, req.user);
    res.send("Please check your email to make payment");
  } catch (error) {
    res.staus(400).send("error" + error);
  }
};
export const verifyPayment = async (req, res) => {
  try {
    let payement = await checkPaymentSuccess(req.query.payment_request_id);
    if (payement.payment_request.status === "Completed") {
      let paymentData = await gentPaymentData(payement.payment_request.id);
      await updateInvoiceStatus(paymentData.invoiceId);
      res.redirect(
        `${process.env.FE_URL}view-invoice/${paymentData.invoiceId}`
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("" + error);
  }
};
