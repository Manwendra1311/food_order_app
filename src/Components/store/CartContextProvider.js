import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartItems= {
    items: [],
    Amount: 0
}

const cartItemHandler =(state,action)=> {
    if(action.type === "ADD"){
       
        const updatedAmount = state.Amount + action.item.Price * action.item.Amount;
        const existingItemIndex= state.items.findIndex((item)=>{
            return item.id ===action.item.id
        })

        const existingItem= state.items[existingItemIndex];

       let updatedItems;
        
        if(existingItem){
            const updatedItem={
                ...existingItem,
                Amount: existingItem.Amount+action.item.Amount
            }
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }
        else{
            updatedItems= state.items.concat(action.item);
        }

         
        return{
            items :updatedItems,
            Amount: updatedAmount
        }
    }
    if(action.type=== "REMOVE"){
       const existingItemIndex= state.items.findIndex((item)=>{
        return item.id === action.id
       })

       const existingItem= state.items[existingItemIndex];
       const updatedAmount= state.Amount - existingItem.Price;
       let updatedItems;
       if(existingItem.Amount === 1){
        updatedItems = state.items.filter((item)=>{
            return item.id !== action.id
        })
       }else{
        const updatedItem={
            ...existingItem,
            Amount:existingItem.Amount-1
        }
        updatedItems=[...state.items]
        updatedItems[existingItemIndex]= updatedItem
       }
       return{
        items :updatedItems,
        Amount: updatedAmount
       }

    }

    if (action.type === "CLEAR"){
        return defaultCartItems
    }
    return defaultCartItems;
}
const CartContextProvider= (props)=>{

    const [cartState, dispatchCartState]=useReducer(cartItemHandler, defaultCartItems);

    const cartAddItemHandler=(items)=>{
        dispatchCartState({type:"ADD", item:items});
    }

    const cartRemoveItemHandler= (id)=>{
        dispatchCartState({type:"REMOVE", id:id});
    }

    const clearCartHandler = ()=>{
        dispatchCartState({type:"CLEAR"})
    }
    const cartContext={
        items:cartState.items,
        totalAmount:cartState.Amount,
        addItem: cartAddItemHandler,
        removeItem: cartRemoveItemHandler,
        clearCart: clearCartHandler
    }
  
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;