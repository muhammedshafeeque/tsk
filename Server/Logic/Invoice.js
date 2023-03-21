import { ObjectId } from "mongodb";
import { getinvoiceCount } from "../Services/invoice.Service.js";
import { numberGenerator, randomNumberGenerate } from "../Utils/utils.js";

export const createRandomInvoice = (data, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await getinvoiceCount();
      let items = [];
      let total = 0;
      for (let i = 0; i < data.numberOfItems; i++) {
        let item = {
          name: `Item${i + 1}`,
          quantity: await randomNumberGenerate(10),
          price: await randomNumberGenerate(),
          
        };
        item.total = item.quantity * item.price;
        total = total + item.total;
        items.push(item);
      }

      let invoice = {
        number: await numberGenerator(count),
        items,
        date: data.date,
        company: data.company,
        client: user.name,
        clientId: user._id,
        total,
        status:'pending'
      };

      resolve(invoice);
    } catch (error) {
      reject(error);
    }
  });
};
export const createinvoice = (data, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await getinvoiceCount();
      let items = [];
      let total = 0;
      data.items.forEach((element) => {
        items.push({
          name: element.item,
          quantity: element.quantity,
          unit: element.unit,
          price: element.price,
          total: element.price * element.quantity,
          
        });
        total = total + element.price * element.quantity;
      });

      let invoice = {
        number: await numberGenerator(count),
        items,
        status:'pending',
        date: data.date,
        company: data.company,
        client: user.name,
        clientId: user._id,
        total,
      };

      resolve(invoice);
    } catch (error) {
      reject(error);
    }
  });
};
