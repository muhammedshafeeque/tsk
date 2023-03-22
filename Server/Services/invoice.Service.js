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
      let keywords = {};
      query.number && (keywords.number = query.number);
      keywords.clientId = user._id;
      query.status && (keywords.status = query.status);
      let invoices = await db()
        .collection(collections.INVOICE_COLLECTION)
        .find(keywords)
        .toArray();
      resolve(invoices);
    } catch (error) {
      reject(error);
    }
  });
};
export const getInvoiceById = (id, user) => {
  return new Promise(async (resolve, reject) => {
    let invoice = await db()
      .collection(collections.INVOICE_COLLECTION)
      .findOne({ _id: ObjectId(id), clientId: user._id });
    resolve(invoice);
  });
};
export const updateInvoiceStatus = (id) => {
  return new Promise(async (resolve, reject) => {
    let invoice = await db()
      .collection(collections.INVOICE_COLLECTION)
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            status: "payed",
          },
        }
      );
    resolve(invoice);
  });
};
