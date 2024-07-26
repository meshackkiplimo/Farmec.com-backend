import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    rent:{type:mongoose.Schema.Types.ObjectId,ref:"Rent"},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    deliveryDetails:{

        email:{type:String,required:true},
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        address: { type: String, required: true },
        town: { type: String, required: true },
        phoneNumber:{type:String, required:true}


    },
    cartItems: [
        {
          categoryItemId: { type: String, required: true },
          quantity: { type: Number, required: true },
          name: { type: String, required: true },
        },
      ],
      totalAmount: Number,
  status: {
    type: String,
    enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
  },
  createdAt: { type: Date, default: Date.now },

})
const Order = mongoose.model("Order", orderSchema);
export default Order;