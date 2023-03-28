import React, {useEffect, useState} from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";




const AvailableMeals = ()=> {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(()=>{
    const fetchMeals = async()=>{
      const response = await fetch("https://react-http-4ebcf-default-rtdb.firebaseio.com/meals.json")

      if(!response.ok){
        throw new Error("failed to fetch");
      }


      const responseData = await response.json();

      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name:responseData[key].name,
          description: responseData[key].description,
          price:responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    fetchMeals().catch((error) =>{
      setIsLoading(false);
      setHttpError(error.message)
    })
  }, [])

  if (isLoading){
    return <section >
      <p className={classes.mealsLoading}>Loading...</p>
    </section>
  }
  
  if(httpError){
    return <section className= {classes.mealsError}>
      <p>{httpError}</p>
    </section>
  }

    const mealsContent= meals.map((meals)=> <MealsItem id={meals.id} key={Math.random()} name={meals.name} price={meals.price} description={meals.description}></MealsItem>)

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsContent}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals