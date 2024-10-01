// src/components/SelectedMealsList.jsx

import React from 'react';

const SelectedMealsList = ({ selectedMeals, meals, onDeleteSelected }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold">Valgte Retter</h2>
            {selectedMeals.length === 0 ? (
                <p className="text-gray-500">Ingen valgte retter.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {meals.filter(meal => selectedMeals.includes(meal.id)).map(meal => (
                        <li key={meal.id} className="py-2 flex justify-between items-center">
                            <span>{meal.name}</span>
                            {/* <button 
                                onClick={() => onDeleteSelected(meal.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded">
                                Slet
                            </button> */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectedMealsList;
