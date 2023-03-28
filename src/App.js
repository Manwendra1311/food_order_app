import React,{ useState} from "react";
import CartItems from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header"
import Meals from "./Components/Meals/Meals";
import CartContextProvider from "./Components/store/CartContextProvider";

function App() {
  const [isShown,setIsShown]= useState(false);

  const showCartHandler= ()=>{
    setIsShown(true)
  }

  const hideCartHandler= ()=>{
    setIsShown(false)
  }
  return (
    <CartContextProvider>
      {isShown && <CartItems onHide={hideCartHandler} />}  
      <Header onShow={showCartHandler}></Header>
      <Meals />
    </CartContextProvider>
  );
}

export default App;
