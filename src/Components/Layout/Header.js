import React,{Fragment} from "react";
import styles from "./Header.module.css";
import Image from "../../Image/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header= (props) =>{
    
    return(
        <Fragment>
            <header className={styles.header}>
                <h1>React MEALS</h1>
                <HeaderCartButton onClick={props.onShow} ></HeaderCartButton>
            </header>
            <div className={styles["main-image"]}>
            <img src={Image} alt="A table full of Delicious Food."  />
            </div>            
        </Fragment>
    )
}

export default Header;