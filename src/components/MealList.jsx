// MealList.jsx
import { useState, useEffect } from 'react';
import { fetchMeals } from '../api';
import DeleteMeal from './DeleteMeal';
import EditMealDialog from './EditMealDialog'; // Import the new EditMealDialog

export default function MealList() {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null); // To keep track of the meal to edit
    const [isEditing, setIsEditing] = useState(false); // To control the dialog

    useEffect(() => {
        const getMeals = async () => {
            const data = await fetchMeals();
            console.log('Fetched meals:', data);
            setMeals(data);
        }

        getMeals();
    }, [])

    const handleDelete = (deletedMealId) => {
        setMeals(meals.filter((meal) => meal.id !== deletedMealId));
    };

    const handleEdit = (meal) => {
        setSelectedMeal(meal); // Set the meal to be edited
        setIsEditing(true); // Open the edit dialog
    };

    return (
        <>
            <ul role='list' className="divide-y divide-gray-100">
                {Array.isArray(meals) && meals.length > 0 ? (
                    meals.map((meal) => {
                        console.log('Meal item:', meal); // Debugging - log each meal item
                        const mealName = meal && typeof meal.name === 'string' ? meal.name : 'Unnamed Meal';
                        return (
                            <li key={meal.id} className='p-2 flex'>
                                <p>{mealName}</p>
                                <div className='flex ms-auto gap-2'>
                                    <button 
                                        onClick={() => handleEdit(meal)} // Add the edit button
                                        className="px-1 px-2 text-sm text-gray-500 border border-gray-500 rounded">
                                        Rediger
                                    </button>
                                    <DeleteMeal mealId={meal.id} onDelete={handleDelete} />
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className='p-2'>Ingen retter fundet.</li>
                )}
            </ul>

            {isEditing && (
                <EditMealDialog 
                    meal={selectedMeal} // Pass the meal to be edited
                    onClose={() => setIsEditing(false)} // Close the dialog
                    setMeals={setMeals} // Pass the function to update meals
                />
            )}
        </>
    );
}
