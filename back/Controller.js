import user from "./Model.js";

///add employee
const addEmployee = async (req, res) => {
  const { name, age, place } = req.body;
  const employe = new user({
    name,
    age,
    place,
  });
  try {
    await employe.save();
    res.json({ success: true, message: "user added" });
  } catch {
    res.json({ success: false, message: "Error" });
  }
};

//get employee
const getEmployee=async(req,res)=>{
  const query= {};
  if(req.query.name){
    query.name = req.query.name;
  }
  if(req.query.age){
    query.age = req.query.age;
  }
  if(req.query.place){
    query.place = req.query.place;
  }

  try{
    const employe=await user.find(query)
    res.json({success:true,data:employe})

}
catch {
    res.json({ success: false, message: "Error" });
  }
}

//update employee
const updateEmployee=async(req,res)=>{
const {name,age,place}=req.body
const update= await user.findByIdAndUpdate(req.params.id,{name,age,place})

  try{
    await update.save()
    res.json({success:true,message:"Employee updated"}) 

  }catch{
    res.json({ success: false, message: "Error" });

  }
  
}

//delete employee
const delteEmployee=async(req,res)=>{
    try{
        await user.findByIdAndDelete(req.params.id)
    res.json({success:true,message:"deleted"})
    }
    catch{
        res.json({success:false,message:"Error"})
    }
}
// get one
const getSingleEmployee=async(req,res)=>{
    try{
       const result= await user.findById(req.params.id)
        res.json({success:true,data:result})
    }catch{
        res.json({success:false,message:"error"})
    }
}

export { addEmployee ,getEmployee,updateEmployee,delteEmployee,getSingleEmployee};
