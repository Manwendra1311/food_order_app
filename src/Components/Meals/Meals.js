import React, {Fragment} from "react";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals= () =>{
    return <Fragment>
        <main>
            <MealsSummary />
            <AvailableMeals/>
        </main>
    </Fragment>
}

export default Meals;