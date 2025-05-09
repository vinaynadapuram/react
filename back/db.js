import mongoose from "mongoose"
export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://teluguskillhubnodejs:fGowGziEXJ45osYy@cluster0.hf9t506.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0",{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then(() => console.log("DB connected "))
        .catch(err => console.log(err))
    
}
export const disConnectDb=async()=>{
  await mongoose.disconnect();
}
