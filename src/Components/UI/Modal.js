import React, {Fragment}from "react";
import  classes from "./Model.module.css";
import ReactDom from "react-dom";

const Backdrop = (props)=>{
   return <div className={classes.backdrop} onClick={props.onPress}></div>
}

const ModalOverlay=(props)=>{
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalElement= document.getElementById("overlay");


const Modal= (props)=>{
    return (
    <Fragment>
        {ReactDom.createPortal(<Backdrop onPress={props.onClick}/>,portalElement)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </Fragment>
    )
    
}

export default Modal;