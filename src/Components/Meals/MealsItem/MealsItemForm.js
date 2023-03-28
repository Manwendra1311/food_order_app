import React,{useRef, useState} from "react";
import classes from "./MealsItemForm.module.css";
import Input from "../../UI/Input";

const MealsItemForm = (props)=>{
    const amountRef= useRef();
    const [isValidAmount, setIsValidAmount]= useState(false);

    const onSubmitHandler= (event)=>{
        event.preventDefault();

        const enteredAmount= amountRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length ===0 || enteredAmountNumber< 1 || enteredAmountNumber>5){
            setIsValidAmount(false);
        }
        props.onAddItem(enteredAmountNumber);
        
    }
    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <Input label="Amount"
                ref={amountRef}
                input={{
                    id:"amount__"+props.id,
                    type:"number",
                    min:"1",
                    max:"5",
                    steps:"1",
                    defaultValue:"1"
                }}
            />
            <button >+ Add</button>
            {isValidAmount && <p>Please enter a valid amount.</p>}
        </form>
    )
}

export default MealsItemForm;