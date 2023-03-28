import React, {Fragment, useContext, useEffect, useState} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) =>{
   const [cartBtnAnimation, setCartBtnAnimation]= useState(false);

    const cartCtx= useContext(CartContext);
    const cartItem= cartCtx.items.reduce((curNumber,item)=>{
        return curNumber+item.Amount;
    },0)

    const btnClasses= `${styles.button} ${cartBtnAnimation ? styles.bump : ""}`
    
    useEffect(()=>{
        setCartBtnAnimation(true)

        const timer=setTimeout(()=>setCartBtnAnimation(false),300)

        return ()=>clearTimeout(timer);
    },[cartCtx.items])

    
    return(
        <Fragment>
            <button className={btnClasses} onClick={props.onClick}>
                <span className={styles.icon}>
                    <CartIcon></CartIcon>
                </span>
                <span>Your Cart</span>
                <span className={styles.badge}>{cartItem}</span>
            </button>
        </Fragment>
    )
}


export default HeaderCartButton;