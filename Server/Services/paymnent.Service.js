import Insta from "instamojo-nodejs";
const API_KEY = process.env.INSTAMOJO_API_KEY;
const AUTH_KEY = process.env.INSTAMOJO_AUTH_TOCKEN;

export const doPayment = (inv, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      Insta.setKeys(process.env.INSTAMOJO_API_KEY, process.env.INSTAMOJO_AUTH_TOCKEN);
      Insta.isSandboxMode(true);
      let data = new Insta.PaymentData();
      let REDIRECT_URL = `${process.env.PAYMENT_REDIRECTING_URL}`;
      data.setRedirectUrl(REDIRECT_URL);
      data.send_email = "True";
      data.purpose = "Test";

      data.amount = inv.total;
      data.name = user.name;
      data.email = user.email;
      Insta.createPayment(data, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve("Please check your email to make payment");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
