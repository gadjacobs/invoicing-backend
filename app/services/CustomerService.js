
const { customer: CustomerModel } = require('../db/sequelize');



module.exports = {


  create: async (data) => {


    try{


      const result =  await CustomerModel.create({
            full_name: data.full_name,
            mobile: data.phone_number,
            email: data.email
      })


      if(result){

        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: result
            })
          
          })
      }else{

        return new Promise((resolve, reject) => {
        resolve({
            status:false,
            message: "Error inserting customer record"
        })
      
    })
      }
  

    }catch(error){


      return new Promise((resolve, reject) => {
   
        reject(error)
     
    })

    }



  },


  findAll: async () => {


    try{

        let users = []

        users = await CustomerModel.findAll({});


        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: users
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

        const user_id = params.user_id

        console.log("user id", user_id)

       const res = await CustomerModel.destroy({
        where: {
            id: user_id
          
        }
    })


      if(res){

        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: "customer deleted successully"
            })
          
          })
      }else{
        return new Promise((resolve, reject) => {
        resolve({
            status:false,
            message: "Cannot find user with id "+ user_id +". Unable to delete"
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

        const user_id = params.user_id

        console.log("user id", user_id)

       const res = await CustomerModel.update({
           data,
        where: {
            id: user_id
          
        }
    })


      if(res){

        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: "customer updated successully"
            })
          
          })
      }else{
        return new Promise((resolve, reject) => {
        resolve({
            status:false,
            message: "Cannot find user with id "+ user_id +". Unable to delete"
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

        const user_id = params.user_id

        console.log("user id", user_id)

       const user = await CustomerModel.findOne({
        where: {
          id: user_id
        }
      });


      if(user){

        return new Promise((resolve, reject) => {
   
            resolve({
                status:true,
                data: user
            })
          
          })
      }else{
        return new Promise((resolve, reject) => {
        resolve({
            status:false,
            message: "Cannot find user with id "+ user_id
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