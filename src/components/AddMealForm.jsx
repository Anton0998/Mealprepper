import { useState } from 'react';

export default function AddMealForm({ onSubmit }) {
    const [mealName, setMealName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(mealName);
    };

    return (
        <form onSubmit={handleSubmit} className=" mx-auto mt-10">
            <label htmlFor="mealName" className="block text-sm font-medium text-gray-700">
                Navn på retten
            </label>
            <input
                type="text"
                id="mealName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Rød karry med kylling"
                onChange={(e) => setMealName(e.target.value)}
                value={mealName}
            />
            {/* Flyt Gem knappen ind i formularen */}
            <button
                type="submit"
                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Gem
            </button>
        </form>
    );
}
