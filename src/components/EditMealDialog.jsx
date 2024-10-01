// src/components/EditMealDialog.jsx
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import AddMealForm from './AddMealForm'; // You can reuse this for editing
import { updateMeal } from '../api';

export default function EditMealDialog({ meal, onClose, setMeals }) {
    const [open, setOpen] = useState(true); // Keep the dialog open

    // src/components/EditMealDialog.jsx
    const handleSubmit = async (mealData) => {
      try {
          const updatedMealData = {
              ...meal, // Behold eksisterende data
              name: mealData.name, // Opdater navnet fra formularen
              ingredients: mealData.ingredients // Opdater ingredienserne
          };

          const response = await updateMeal(meal.id, updatedMealData); // Opdater måltidet
          console.log('Meal updated successfully:', response.data);
          
          // Opdater state
          setMeals(prevMeals => prevMeals.map(m => (m.id === meal.id ? response.data : m))); // Opdater måltidet i listen
          onClose(); // Luk dialogen
      } catch (error) {
          console.error('Error updating meal:', error);
      }
    };


    return (
        <Dialog open={open} onClose={onClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                Rediger Ret
                            </DialogTitle>
                            <div className="mt-2">
                                <AddMealForm 
                                    onSubmit={handleSubmit} 
                                    initialMealData={meal} // Pass the meal data for editing
                                />
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
