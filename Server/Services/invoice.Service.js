import { collections } from "../Config/collecttion.js"
import { db } from "../Config/db.js"

export const getinvoiceCount=()=>{
    return new Promise(async(resolve,reject)=>{
       let count=await db().collection(collections.INVOICE_COLLECTION).count()
       resolve(count)
    })
}
export const createInvoice=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            
        } catch (error) {
            
        }
    })
}