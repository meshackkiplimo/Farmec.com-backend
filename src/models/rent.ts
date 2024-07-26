import mongoose, { InferSchemaType } from "mongoose";
const categoryItemSchema =new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,required:true,
        default:()=>new mongoose.Types.ObjectId(),
    },
    name:{type:String,required:true},
    price:{type:Number,required:true},
})

export type CategoryItemType = InferSchemaType<typeof categoryItemSchema>
  
const rentSchema=  new mongoose.Schema({

    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    rentName:{type:String,required:true},
    town:{type:String,required:true},
    county:{type:String,required:true},
    deliveryPrice:{type:Number,required:true},
    estimatedDeliveryTime:{type:Number,required:true},
    machines:[{type:String,required:true}],
    categoryItems:[categoryItemSchema],
    imageUrl:{type:String,required:true},
    lastUpdated:{type:Date,required:true},

})

const Rent = mongoose.model("Rent",rentSchema)
export default Rent
