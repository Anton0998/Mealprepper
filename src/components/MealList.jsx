// src/components/MealList.jsx
import { useState, useEffect } from 'react';
import { fetchMeals } from '../api';
import DeleteMeal from './DeleteMeal';
import EditMealDialog from './EditMealDialog'; 
import SelectedMealsList from './SelectedMealList';

export default function MealList() {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null); // To keep track of the meal to edit
    const [isEditing, setIsEditing] = useState(false); // To control the dialog
    const [selectedMeals, setSelectedMeals] = useState([]);

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

    const handleSelectMeal = (mealId) => {
        setSelectedMeals((prevSelected) => {
            if (prevSelected.includes(mealId)) {
                return prevSelected.filter(id => id !== mealId) //remove selected
            } else {
                return [...prevSelected, mealId]; // add selected
            }
        })
    }

    return (
        <div className='flex gap-8 justify-between'>
            <ul role='list' className="w-2/3 divide-y divide-gray-100 border border-gray-200 rounded-lg">
                {Array.isArray(meals) && meals.length > 0 ? (
                    meals.map((meal) => {
                        const mealName = meal && typeof meal.name === 'string' ? meal.name : 'Unnamed Meal';
                        return (
                            <li key={meal.id} className='p-3 flex items-center'>
                                <input 
                                    className='me-2 cursor-pointer'
                                    type='checkbox' 
                                    checked={selectedMeals.includes(meal.id)} 
                                    onChange={() => handleSelectMeal(meal.id)} // Add the checkbox
                                />
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
            <div className='w-1/3'>
                {/* Inkluder det nye komponent til valgte retter */}
                <SelectedMealsList 
                    selectedMeals={selectedMeals}
                    meals={meals}
                />
            </div>
        </div>
    );
}
