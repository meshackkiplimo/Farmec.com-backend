import Stripe from "stripe";
import {Request,Response} from "express"
import Rent, { CategoryItemType } from "../models/rent";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string)
const FRONTEND_URL = process.env.FRONTEND_URL  as string
type  CheckoutSessionRequest ={
    cartItems:{
        categoryItemId:string
        name: string
        quantity:string
    }[]
    deliveryDetails:{
        email:string
        name:string
        addressLine1:string
        city:string

    }
    rentId:string
}

const  createCheckoutSession = async(req:Request,res:Response)=>{
try {
    const checkoutSessionRequest : CheckoutSessionRequest =req.body

    const rent = await Rent.findById(
        checkoutSessionRequest.rentId
    )
    if (!rent) {
        throw new Error("Rent not found")
    }

    const lineItems = createLineItems(
        checkoutSessionRequest,
        rent.categoryItems
    )
    const session = await createSession(
        lineItems,
        "TEST_ORDER_ID",
        rent.deliveryPrice,
        rent._id.toString()
    )

    if(!session.url){
        return res.status(500).json({message:"Errror creating Stripe session"})
        
    }
    res.json({url:session.url})

    
} catch (error:any) {
    console.log(error)
    res.status(500).json({message:error.raw.message})
    
}

}
const createLineItems =(
    checkoutSessionRequest:CheckoutSessionRequest,
    categoryItems:CategoryItemType[]

)=>{

    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const categoryItem = categoryItems.find(
          (item) => item._id.toString() === cartItem.categoryItemId.toString()
        );
    
        if (!categoryItem) {
            throw new Error(`Menu item not found: ${cartItem.categoryItemId}`);
          }
          const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
              currency: "usd",
              unit_amount: categoryItem.price,
              product_data: {
                name: categoryItem.name,
              },
            },
            quantity: parseInt(cartItem.quantity),
          };
          return line_item
})
return lineItems

}
const createSession = async (
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId: string,
    deliveryPrice: number,
    rentId: string
  ) => {
    const sessionData = await STRIPE.checkout.sessions.create({
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery",
            type: "fixed_amount",
            fixed_amount: {
              amount: deliveryPrice,
              currency: "gbp",
            },
          },
        },
      ],
      mode: "payment",
      metadata: {
        orderId,
        rentId,
      },
      success_url: `${FRONTEND_URL}/order-status?success=true`,
      cancel_url: `${FRONTEND_URL}/detail/${rentId}?cancelled=true`,
    });
  
    return sessionData;
  };
  export default{
    createCheckoutSession
  }
  
