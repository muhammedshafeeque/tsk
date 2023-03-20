import { ObjectId } from "mongodb";
import { collections } from "../Config/collecttion.js";
import { db } from "../Config/db.js";

export const getinvoiceCount = () => {
  return new Promise(async (resolve, reject) => {
    let count = await db().collection(collections.INVOICE_COLLECTION).count();
    resolve(count);
  });
};
export const insertInvoice = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db().collection(collections.INVOICE_COLLECTION).insertOne(data);
      resolve("invoice Generated Successfully");
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllinvoices = (query, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let kewords = {};
      query.number && (kewords.number = query.number);
      kewords.clientId = user._id;
      let invoices = await db()
        .collection(collections.INVOICE_COLLECTION)
        .find(kewords)
        .toArray();
      resolve(invoices);
    } catch (error) {
      reject(error);
    }
  });
};
