import Insta from "instamojo-nodejs";
import { ObjectId } from "mongodb";
import { collections } from "../Config/collecttion.js";
import { db } from "../Config/db.js";

const API_KEY = process.env.INSTAMOJO_API_KEY;
const AUTH_KEY = process.env.INSTAMOJO_AUTH_TOCKEN;

export const doPayment = (inv, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      Insta.setKeys(
        process.env.INSTAMOJO_API_KEY,
        process.env.INSTAMOJO_AUTH_TOCKEN
      );
      Insta.isSandboxMode(true);
      let data = new Insta.PaymentData();
      let REDIRECT_URL = `${process.env.PAYMENT_REDIRECTING_URL}/api/pay/verify-payement`;
      data.setRedirectUrl(REDIRECT_URL);
      data.send_email = "True";
      data.purpose = "Test";

      data.amount = inv.total;
      data.name = user.name;
      data.email = user.email;
      Insta.createPayment(data, async (error, response) => {
        let res = JSON.parse(response);
        await db()
          .collection(collections.PAYMENT_COLLECTION)
          .insertOne({
            invoiceId: ObjectId(inv._id),
            userId: ObjectId(user._id),
            paymentId: res.payment_request.id,
          });
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
export const insertPaymentOption = (id, user) => {
  return new Promise(async (resolve, reject) => {
    let payment = await db()
      .collection(collections.PAYMENT_COLLECTION)
      .insertOne({ invoiceId: ObjectId(id), userId: ObjectId(user._id) });
    resolve(payment.insertedId);
  });
};
export const checkPaymentSuccess = (id) => {
  return new Promise((resolve, reject) => {
    try {
      Insta.setKeys(
        process.env.INSTAMOJO_API_KEY,
        process.env.INSTAMOJO_AUTH_TOCKEN
      );
      Insta.isSandboxMode(true);
      Insta.getPaymentRequestStatus(id, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const gentPaymentData = (id) => {
  return new Promise(async(resolve, reject) => {
    let payment=await db().collection(collections.PAYMENT_COLLECTION).findOne({paymentId:id})
    resolve(payment)
  });
};
