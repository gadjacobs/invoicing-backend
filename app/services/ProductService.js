
const { product: ProductModel } = require('../db/sequelize');



module.exports = {


  create: async (data) => {


    try{


      const result =  await ProductModel.create({
            stock: data.stock,
            name: data.name,
            description: data.description,
            cost: data.cost
      })


      if(result){

        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                message:"Product created successfully",
                data: result
            })
          
          })
      }else{
        return new Promise((resolve, reject) => {
        resolve({
            status:false,
            message: "Error inserting product record"
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

        let products = []

        products = await ProductModel.findAll({});


        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: products
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

        const product_id = params.product_id

        console.log("product id", product_id)

       const res = await ProductModel.destroy({
        where: {
            id: product_id
          
        }
    })


      if(res){

        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: "product deleted successully"
            })
          
          })
      }else{
        return new Promise((resolve, reject) => {
        resolve({
            status:false,
            message: "Cannot find product with id "+ product_id +". Unable to delete"
        })
    })

      }
  

    }catch(error){


      return new Promise((resolve, reject) => {
   
        reject(error)
     
    })

    }



  },


  update: async (params) => {


    try{

        const product_id = params.product_id

        console.log("product id", product_id)

       const res = await ProductModel.update({
           data,
        where: {
            id: product_id
          
        }
    })


      if(res){

        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: "product updated successully"
            })
          
          })
      }else{
        return new Promise((resolve, reject) => {
   
        resolve({
            status:false,
            message: "Cannot find product with id "+ product_id +". Unable to update"
        })
      
    })
      }
  

    }catch(error){


      return new Promise((resolve, reject) => {
   
        reject(error)
     
    })

    }



  },


search: async (query) => {

    try{

        const searchQuery = query.q

        console.log("search term", searchQuery)

       const products = await ProductModel.findAll({
        where: {
            name: {
                [Sequelize.Op.iLike]: '%'+searchQuery+'%'
            }
        }
    });




        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: products
            })
          
          })
 
  

    }catch(error){


      return new Promise((resolve, reject) => {
   
        reject(error)
     
    })

    }



  },

  findOne: async (params) => {

    try{

        const product_id = params.product_id

        console.log("product id", product_id)

       const product = await ProductModel.findOne({
        where: {
          id: product_id
        }
      });


      if(product){

        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: product
            })
          
          })
      }else{

        return new Promise((resolve, reject) => {

        resolve({
            status:false,
            message: "Cannot find product with id "+ product_id
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