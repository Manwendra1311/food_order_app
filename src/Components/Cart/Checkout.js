import classes from './Checkout.module.css';
import {useRef , useState} from "react";

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity]= useState({
        name: true,
        street: true,
        postal: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const textValidity = value => value.trim() === "";
    const codeValidity = value => value.trim().length !== 6;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName= nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredpostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameInputIsValid = !textValidity(enteredName);
    const streetInputIsValid = !textValidity(enteredStreet);
    const postalInputIsValid = !codeValidity(enteredpostal);
    const cityInputIsValid = !textValidity(enteredCity);

    setFormInputsValidity({
        name: nameInputIsValid,
        street: streetInputIsValid,
        postal: postalInputIsValid,
        city: cityInputIsValid
    })

    const formIsValid = nameInputIsValid && streetInputIsValid && postalInputIsValid && cityInputIsValid;

    if(!formIsValid){
        return ;
    }

    props.onConfirm({
      name:enteredName,
      city:enteredCity,
      street:enteredCity,
      postal: enteredpostal
    })
  };


  const nameInputClass = `${classes.control} ${formInputsValidity.name? "": classes.invalid}`
  const streetInputClass = `${classes.control} ${formInputsValidity.street? "": classes.invalid}`
  const postalInputClass = `${classes.control} ${formInputsValidity.postal? "": classes.invalid}`
  const cityInputClass = `${classes.control} ${formInputsValidity.city? "":  classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClass}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetInputClass}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid Street.</p>}
      </div>
      <div className={postalInputClass}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formInputsValidity.postal && <p>Please enter a valid postal (length =5 ).</p>}
      </div>
      <div className={cityInputClass}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;