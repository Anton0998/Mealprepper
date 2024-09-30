import { useState, useEffect } from 'react';
import { fetchMeals } from '../api';

export default function MealList() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const getMeals = async () => {
            const data = await fetchMeals();
            console.log('Fetched meals:', data);
            setMeals(data);
        }

        getMeals();
    }, [])

    return (
        <>
            <ul role='list' className="divide-y divide-gray-100">
                {Array.isArray(meals) && meals.length > 0 ? (
                    meals.map((meal) => {
                        // Kontrolér, at meal.name er en streng
                        const mealName = typeof meal.name === 'string' ? meal.name : 'Unnamed Meal';
                        return (
                            <li key={meal.id} className='p-2'>
                                <p>{mealName}</p>
                            </li>
                        );
                    })
                ) : (
                    <li className='p-2'>Ingen retter fundet.</li>
                )}
            </ul>
        </>
    );
}
