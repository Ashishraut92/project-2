const internModel=require("../models/internModel")



const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}



const createIntern=async function(req,res){
    try{
   const data= req.body
   const {name,email,mobile} =data

   if(Object.keys(data)==0){
    return res.status(400).send({ status: false, msg: " data is  missing" })
  }
  const req0= isValid(name)
  if(!req0){
    return res.status(400).send({ status: false, msg: " name is required" })

  }
  const req1= isValid(email)
  if(!req1){
    return res.status(400).send({ status: false, msg: " email is required" })

  }

  const req2= isValid(mobile)
  if(!req2){
    return res.status(400).send({ status: false, msg: " mobile is required" })

  }
  const isEmailAlreadyUsed = await internModel.findOne({ email });

  if (isEmailAlreadyUsed) {
      return res.status(400).send({ status: false, msg: `${email} email is already used` })
  }


  const isMobileAlreadyUsed = await internModel.findOne({ mobile });

  if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)))
  return res.status(400).send({ status: false, msg: " email is invalid" })

  if (isMobileAlreadyUsed) {
      return res.status(400).send({ status: false, msg: `${mobile} mobile is already used` })
  }

  

  
  if(!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)))
  return res.status(400).send({ status: false, msg: " mobile is invalid" })
  
  
   const saveData= await internModel.create(data)
   res.status(201).send({status:"successful-response-structure",msg:saveData})
    }catch(err)
    {
        res.status(500).send({error:err.message})
    }
}

const getCollegeDetails= async function(req,res)
{
    try
    {    
        const data=req.query
         const getdetails= await internModel.find(data).count()
        const getdetails1= await internModel.find(data).populate("collegeId")

        res.status(200).send({status:true,count:getdetails,data:getdetails1})
    }
    catch(err){
        res.status(500).send({error:err.mesage})
    }
}

module.exports.createIntern=createIntern

module.exports.getCollegeDetails=getCollegeDetails