import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type===ADD_TO_CART){
const{id,amount,product}=action.payload
const tempitem=state.cart.find((i)=>i.id===id)
if(tempitem){
const tempCart=state.cart.map((ci)=>{
  if(ci.id===id){
let newAmount=ci.amount+amount
if(newAmount>ci.max){
  newAmount=ci.max
}
return{
  ...ci,
  amount:newAmount
}
  }
  else{
    return ci
  }
})
return {...state,cart:tempCart}
}
else{
  const newItem={
    id:id,
    name:product.name,
    amount,
    image:product.images[0].url,
    price:product.price,
    max:product.stock
  } 
  return {
    ...state,
    cart:[...state.cart,newItem]
  }

  } 
   
  }
  if(action.type===REMOVE_CART_ITEM){
    const tempCart=state.cart.filter((item)=>item.id!==action.payload)
    return{
      ...state,
      cart:tempCart
    }
  }
  if(action.type===CLEAR_CART){
    return{...state,cart:[]}
  }
  if(action.type===TOGGLE_CART_ITEM_AMOUNT){
    const{id,value}=action.payload
    const tempCart=state.cart.map((item)=>{
      if(item.id===id){
if(value==="inc"){
let newAmount=item.amount+1
if(newAmount>item.max){
  newAmount=item.max
}
return {...item,amount:newAmount}
} if(value==="dec"){
  let newAmount=item.amount-1
  if(newAmount<1){
    newAmount=1
  }
  return {...item,amount:newAmount}
}
      } 
        return item
  
    })
    return{
      ...state,
      cart:tempCart
    }
  }
  if(action.type===COUNT_CART_TOTALS){
    const{totalItems,totalAmount}=state.cart.reduce((total,cartItem)=>{
      const{amount,price}=cartItem
      total.totalItems+=amount
      total.totalAmount+=price*amount
return total
    },{
      totalItems:0,
      totalAmount:0
    })
    return {
      ...state,
      totalAmount,
      totalItems
    }
  }
  return state
  // throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
