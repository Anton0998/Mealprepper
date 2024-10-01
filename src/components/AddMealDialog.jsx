import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import AddMealForm from './AddMealForm';
// import axios from 'axios';
import { addMeal } from '../api';


export default function AddMealDialog({ setMeals }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (mealData) => {
    const { name, ingredients } = mealData;

    try {
      const response = await addMeal(name, ingredients); // Vent på tilføjelsen
      console.log('Meal added successfully:', response.data);
      setOpen(false); // Luk dialogen

      // const updatedMeals = await fetchMeals(); // Vent på at hente de opdaterede måltider
      // setMeals(updatedMeals); // Opdater state med de nye måltider
    } catch (error) {
      console.error('There was an error adding the meal:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Tilføj ret
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Tilføj ret
                    </DialogTitle>
                    <div className="mt-2">
                      {/* Inkluder formularen her */}
                      <AddMealForm onSubmit={handleSubmit} />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
