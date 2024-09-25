import { useState, useEffect } from 'react';
import mealsData from '../utils/meals.json';
// import { v4 as uuidv4 } from 'uuid';

export default function MealList() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        // localStorage.clear();
        setMeals(mealsData.meals);
        localStorage.setItem('meals', JSON.stringify(mealsData.meals));
        // console.log(localStorage.getItem('meals'));
    }, []);

    return (
        <>
        <ul role='list' className="divide-y divide-gray-100 ">
            {meals.map((meal) => (
                <li key={meal.name} className='p-2'>
                    <p>{meal.name}</p>
                </li>
            ))}
        </ul>
        </>


      );
      
}
