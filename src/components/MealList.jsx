import { useState, useEffect } from 'react';
import { fetchMeals } from '../api';
import DeleteMeal from './DeleteMeal';

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

    const handleDelete = (deletedMealId) => {
        // Opdatér meals-listen, når et måltid bliver slettet
        setMeals(meals.filter((meal) => meal.id !== deletedMealId));
    };

    return (
        <>
            <ul role='list' className="divide-y divide-gray-100">
                {Array.isArray(meals) && meals.length > 0 ? (
                    meals.map((meal) => {
                        // Kontrolér, at meal.name er en streng
                        const mealName = typeof meal.name === 'string' ? meal.name : 'Unnamed Meal';
                        return (
                            <li key={meal.id} className='p-2 flex'>
                                <p>{mealName}</p>
                                <DeleteMeal mealId={meal.id} onDelete={handleDelete} /> 
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
