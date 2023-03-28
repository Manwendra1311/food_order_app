import CartContext from "../../store/cart-context"
import { Fragment, useContext } from "react";
import classes from "./MealsItem.module.css"
import MealsItemForm from "./MealsItemForm";

const MealsItem = (props)=>{
    const CartCtx= useContext(CartContext);

    const addItemHandler=(amount)=>{
        CartCtx.addItem(
            {   key:Math.random(),
                id:props.id,
                name:props.name,
                Amount:amount,
                Price: props.price
            }
        )
    }

    const price= `$${props.price}`;
    return(
        <Fragment>
            <li className={classes.meal}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <div className={classes.price}>{price}</div>
                </div>
                <div>
                    <MealsItemForm onAddItem={addItemHandler}/> 
                </div>
            </li>
        </Fragment>
    )
}

export default MealsItem;