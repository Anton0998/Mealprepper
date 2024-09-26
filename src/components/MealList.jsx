import { useState, useEffect } from 'react';
import mealsData from '../utils/meals.json';
import { fetchMeals } from '../api';
// import { v4 as uuidv4 } from 'uuid';

export default function MealList() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const getMeals = async () => {
            const data = await fetchMeals();
            setMeals(data);
        };

        getMeals();
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
