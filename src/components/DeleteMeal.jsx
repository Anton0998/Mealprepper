import { useState } from 'react'
import { deleteMeal } from '../api';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'


export default function DeleteMeal({ mealId, onDelete }) {
    const [open, setOpen] = useState(false)


    const handleDelete = () => {
        deleteMeal(mealId)
            .then(() => {
                console.log(`Meal with id ${mealId} deleted successfully`)
                if (onDelete) onDelete(mealId); // Opdatere listen efter sletning
            })
            .catch((error) => {
                console.log('There was an error deleting the meal:', error)
            })

        setOpen(false);
    }

    return (
    <>
        <button onClick={() => setOpen(true)}  className='ms-auto px-1 px-2 text-sm ms-auto border border-red-400 rounded text-red-400'  >
            Slet
        </button>
        
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Slet ret
                    </DialogTitle>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        Er du sikker på at du vil slette denne ret?
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                    Slet
                </button>
                <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Afbryd
                </button>
                </div>
            </DialogPanel>
            </div>
        </div>
        </Dialog>
    </>
        
    )
}
