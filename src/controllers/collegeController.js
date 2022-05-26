const collegeModel=require('../models/collegeModel')

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

  
  
  const createCollege = async function(req,res){
      try {
          let data =req.body
          // const name = req.body.name
          const {name,fullName,logoLink} =data
          if(Object.keys(data)==0){
            return res.status(400).send({ status: false, msg: " data is  missing" })
          }
          const req0= isValid(name)
          if(!req0){
            return res.status(400).send({ status: false, msg: " name is required" })
  
          }
          const req1 = isValid(fullName)
          if(!req1){
            return res.status(400).send({ status: false, msg: " fullName is required" })
          }
          const req2 = isValid(logoLink)
          if(!req2){
            return res.status(400).send({ status: false, msg: " logoLink is required" })
          }
          const isNameAlreadyUsed = await collegeModel.findOne({ name });

          if (isNameAlreadyUsed) {
              return res.status(400).send({ status: false, msg: `${name} name  is already used` })
          }


          if(!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logoLink)))
          return res.status(400).send({ status: false, msg: " logoLink is invalid" })
  
              let saveData = await collegeModel.create(data)
              res.status(201).send({status:true, msg: saveData})
              
        }
        catch(err) {
          res.status(500).send({ status: false, msg: err.message })
        }
  }



module.exports.createCollege=createCollege