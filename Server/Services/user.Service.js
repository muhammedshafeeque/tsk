import { ObjectId } from "mongodb";
import { collections } from "../Config/collecttion.js";
import { db } from "../Config/db.js";
export const getUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db()
        .collection(collections.USER_COLLECTION)
        .findOne({ email: email });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
export const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let User = await db()
        .collection(collections.USER_COLLECTION)
        .insertOne(user);
      resolve(User);
    } catch (error) {
      reject(error);
    }
  });
};
export const getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db()
        .collection(collections.USER_COLLECTION)
        .findOne({ _id: ObjectId(id) })
      resolve(user);
      
    } catch (error) {
      console.log(error)
      reject(error);
    }
  });
};
