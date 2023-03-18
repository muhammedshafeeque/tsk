import { ObjectId } from "mongodb";
import { getinvoiceCount } from "../Services/invoice.Service.js";
import { numberGenerator, randomNumberGenerate } from "../Utils/utils.js";

export const generateInvoice = async (req, res) => {
  try {
    let count = await getinvoiceCount();
    let items = [];
    let total=0
    for (let i = 0; i < req.body.numberOfItems; i++) {
      let item = {
        name: `Item${i + 1}`,
        quantity: await randomNumberGenerate(10),
        price: await randomNumberGenerate(),
      };
      item.total = item.quantity * item.price;
      total=total+item.total
      items.push(item);
    }

    let invoice = {
      invoiceNumber: await numberGenerator(count),
      items,
      currency: req.body.currency,
      date: req.body.date,
      company: req.body.company,
      client: req.user.name,
      clientId:ObjectId(req.user._id),
      total
    };

    res.send(invoice);
  } catch (error) {
    console.log(error);
  }
};
