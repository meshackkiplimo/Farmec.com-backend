import mongoose from "mongoose";
const categoryItemSchema =new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true}
})
  
const rentSchema=  new mongoose.Schema({

    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    rentName:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true},
    deliveryPrice:{type:Number,required:true},
    estimatedDeliveryTime:{type:Number,required:true},
    machines:[{type:String,required:true}],
    categoryItems:[categoryItemSchema],
    imageUrl:{type:String,required:true},
    lastUpdated:{type:Date,required:true},

})

const Rent = mongoose.model("Rent",rentSchema)
export default Rent
