import CartContext from "../store/cart-context";
import React, {useContext, useState} from "react";
import classes from "./CartItems.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const CartItems= (props)=>{
    const cartCtx = useContext(CartContext);
    const [onShowHandler, setShowHandler] = useState(false);
    const totalAmount= `$${cartCtx.totalAmount?.toFixed(2)}`;
    const hasItems= cartCtx.items.length>0;
    const [didSubmit, setDidSubmit]= useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onAddItemHandler=(item)=>{
        cartCtx.addItem({...item,Amount:1})
    };
    const onRemoveItemHandler= (id)=>{
        cartCtx.removeItem(id);
    };

    const onOrderHandler = ()=>{
        setShowHandler(true);
    }

    const onConfirmOrderHandler = (userData) => {
        setIsSubmitting(true);
        fetch('https://react-http-4ebcf-default-rtdb.firebaseio.com/orders.json', {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items
          })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      };
    const CartItemVariable= <ul className={classes["cart-items"]}>{cartCtx.items.map((item)=>{
        return(
            <CartItem key={item.key}  id={item.id} name={item.name} amount={item.Amount} price={item.Price} onRemove={onRemoveItemHandler.bind(null,item.id)} onAdd={onAddItemHandler.bind(null,item)}/>
        )
    })}</ul>

    const modalAction = <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onHide}>Close</button>
            {hasItems && <button className={classes.button} onClick={onOrderHandler}>Order</button>}
        </div>

    
    const modalItems= <React.Fragment>
        {CartItemVariable}
        <div className={classes.total}>
            <section>Total Amount</section>
            <section >{totalAmount}</section>
        </div>
        {onShowHandler && <Checkout onCancel={props.onHide} onConfirm={onConfirmOrderHandler} />}
        {!onShowHandler && modalAction}
    </React.Fragment>

    const submitItems = <p>Sending Order Data ....</p>

    const dataSucessfullySubmitted = <React.Fragment>
    <p>Your order has been sucessfully placed.</p>
    <div className={classes.actions}>
            <button className={classes.button} onClick={props.onHide}>Close</button>
            
        </div>
    </React.Fragment>


    return(
        <Modal className={classes["cart-item"]} onClick={props.onHide}>
            {!didSubmit && !isSubmitting && modalItems} 
            {isSubmitting && submitItems}
           {didSubmit && !isSubmitting && dataSucessfullySubmitted }
        </Modal>
    )
}

export default CartItems;