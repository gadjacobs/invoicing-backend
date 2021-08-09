
const { invoice: InvoiceModel } = require('../db/sequelize');
const { item: ItemModel } = require('../db/sequelize');

const { product: ProductModel } = require('../db/sequelize');

const { customer: CustomerModel } = require('../db/sequelize');
const customerModel = require('../models/sequelize/customer.model');


module.exports = {


  create: async (data) => {

	
    try{

        console.log("data",data)

        // get customer 

        const customer = await CustomerModel.findOne({
            where: {
              id: data.customer_id
            }
          });


      const result =  await InvoiceModel.create({
            amount: data.amount,
            payment_mode: data.payment_mode,
            tax_percentage: data.tax_percentage,
            discount_percentage: data.discount_percentage,
            customerid: data.customer_id
      })

      await customer.setInvoices([result])


      if(result){
          

        const items = data.items

        items.forEach(async(p) =>{

           const product = await ProductModel.findOne({
            where: {
              id: p.id
            }
          });

          const item =  await ItemModel.create({
                price: parseInt(p.quantity) * parseInt(product.cost),
                invoiceid: result.id,
                productid: product.id,
                quantity: p.quantity
          })

         await result.setItems([item])

         await product.setItems([item])

    
        })


        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                message:"Invoice created successfully",
                data: result
            })
          
          })
      }else{
        return new Promise((resolve, reject) => {
        resolve({
            status:false,
            message: "Error inserting invoice record"
        })
    })

      }
  

    }catch(error){


      return new Promise((resolve, reject) => {
   
        reject({status:false, message: error.message})
     
    })

    }


  },


  findAll: async () => {


    try{

        let invoices = []

        invoices = await InvoiceModel.findAll({ include: ['Items','Customer'] });


        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: invoices
            })
          
          })
      
  

    }catch(error){


      return new Promise((resolve, reject) => {
   
        reject({
            status: false,
            message: error.message
        })
     
    })

    }



  },

  
delete: async (params) => {


    try{

        const invoice_id = params.invoice_id

        console.log("invoice id", invoice_id)

       const res = await InvoiceModel.destroy({
        where: {
            id: invoice_id
          
        }
    })


      if(res){

        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: "invoice deleted successully"
            })
          
          })
      }else{
        return new Promise((resolve, reject) => {
        resolve({
            status:false,
            message: "Cannot find invoice with id "+ invoice_id +". Unable to delete"
        })
      
    })
      }
  

    }catch(error){


      return new Promise((resolve, reject) => {
   
        reject(error)
     
    })

    }



  },





  findOne: async (params) => {


    try{

        const invoice_id = params.invoice_id

        console.log("invoice id", invoice_id)

       const invoice = await InvoiceModel.findOne({
        where: {
          id: invoice_id
        },
        include: [
            {model: ItemModel,  as: 'Items', include: ['Product'] },
            {model: CustomerModel, as: 'Customer' }
          ]
       //  include: ['Items','Customer'] 
      });


      if(invoice){


        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: invoice
            })
          
          })
      }else{
        return new Promise((resolve, reject) => {
        resolve({
            status:false,
            message: "Cannot find invoice with id "+ invoice_id
        })
    })

      }
  

    }catch(error){


      return new Promise((resolve, reject) => {
   
        reject(error)
     
    })

    }



  },



}