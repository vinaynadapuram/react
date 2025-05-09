import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
    name: { type: String, required: true },
  age: {type:Number,required:true},
  place: {type:String,required:true}
})
const user=mongoose.model("Employes",userSchema);// creates 'users' collection

export default user;