import React, {Fragment,forwardRef} from "react";
import classes from "./Input.module.css";

const Input= forwardRef((props, ref)=>{
    return(
        <Fragment>
            <section className={classes.input}>
                <label htmlFor={props.label}>{props.label}</label>
                <input ref={ref} {...props.input}/>
            </section>
        </Fragment>
    )
})

export default Input;