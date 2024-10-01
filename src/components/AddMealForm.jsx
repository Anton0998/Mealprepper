// src/components/AddMealsForm.jsx

import { useState, useEffect } from 'react';
// import { deleteMeal } from '../api';
import { v4 as uuidv4 } from 'uuid'; 

export default function AddMealForm({ onSubmit, initialMealData }) {
  const [mealName, setMealName] = useState('');
  const [ingredients, setIngredients] = useState({
    frost: [],
    grønt: [],
    protein: [],
    mejeri: [],
    kulhydrater: [],
    krydderi: [],
    øvrige: [],
  });

  const [currentIngredient, setCurrentIngredient] = useState({
    category: 'grønt', // Default category
    item: '',
    amount: '',
    unit: 'g', // Default unit
  });

// src/components/AddMealForm.jsx
  useEffect(() => {
    if (initialMealData) {
        setMealName(initialMealData.name || ''); // Giv en standardværdi, hvis `name` ikke findes
        setIngredients(initialMealData.ingredients || {}); // Giv en standardværdi, hvis `ingredients` ikke findes
    }
  }, [initialMealData]);


  const handleIngredientChange = (field, value) => {
    setCurrentIngredient(prev => ({ ...prev, [field]: value }));
  };

  const handleAddIngredient = () => {
    const { category, item, amount, unit } = currentIngredient;

    if (item && amount) {
      setIngredients(prev => ({
        ...prev,
        [category]: [...prev[category], { item, amount: parseFloat(amount), unit, id: uuidv4(),}],
      }));
      setCurrentIngredient({ category, item: '', amount: '', unit: 'g' }); // Clear current input
    }
  };

  const handleDeleteIngredient = (category, id) => {
    setIngredients((prev) => ({
      ...prev,
      [category]: prev[category].filter(ingredient => ingredient.id !== id)
    }))

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mealName || Object.keys(ingredients).length === 0) {
        alert('Please fill in all fields');
        return; // Stop hvis ikke alle felter er udfyldt
    }

    onSubmit({
        name: mealName,
        ingredients,
    });

    // Clear inputs after submit (optional)
    setMealName('');
    setIngredients({
        frost: [],
        grønt: [],
        protein: [],
        mejeri: [],
        kulhydrater: [],
        krydderi: [],
        øvrige: [],
    });
};


  // const handleDeleteIngredient = ({index}) => {
  //   const removeIngredient = ingredients.pop(index)

  //   setIngredients((prev) => (
  //     ...prev,
  //     []
  //   ))
  // }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10">
      <label htmlFor="mealName" className="block text-sm font-medium text-gray-700">
        Navn på retten
      </label>
      <input
        type="text"
        id="mealName"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Fx: Rød karry med kylling"
        onChange={(e) => setMealName(e.target.value)}
        value={mealName}
      />

      {/* Input for current ingredient */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Ingredienser
        </label>
        <div className="grid grid-cols-3 gap-2">
          <input
            className="col-span-2 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="text"
            placeholder="Indtast ingrediens navn"
            onChange={(e) => handleIngredientChange('item', e.target.value)}
            value={currentIngredient.item}
          />
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => handleIngredientChange('category', e.target.value)}
            value={currentIngredient.category}
          >
            <option value="grønt">Grønt</option>
            <option value="protein">Protein</option>
            <option value="mejeri">Mejeri</option>
            <option value="kulhydrater">Kulhydrater</option>
            <option value="krydderi">Krydderi</option>
            <option value="øvrige">Øvrige</option>
            <option value="frost">Frost</option>
          </select>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="number"
            placeholder="Indtast mængde"
            onChange={(e) => handleIngredientChange('amount', e.target.value)}
            value={currentIngredient.amount}
          />
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={currentIngredient.unit}
            onChange={(e) => handleIngredientChange('unit', e.target.value)}
          >
            <option value="g">g</option>
            <option value="mL">mL</option>
            <option value="stk">stk</option>
          </select>
          
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-1 inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Tilføj
          </button>
        </div>
    </div>
    <div className='mt-4'>
        {Object.entries(ingredients).map(([category, items]) => (
            <div key={category}>
                <p className="text-sm text-gray-600 font-semibold capitalize">{category}</p>
                {items.length > 0 ? 
                    ( <ul className='pb-4 divide-y divide-gray-100'>
                        {items.map((ingredient, index) => (
                        <li key={ingredient.id}  className="py-1 flex justify-between ps-4 text-gray-500 text-sm items-center">
                          <div>
                            <p>{ingredient.item}</p>
                            <p className='text-gray-400'>{`${ingredient.amount} ${ingredient.unit}`}</p>
                          </div>
                          <button onClick={() => handleDeleteIngredient(category, ingredient.id)} >X</button>
                        </li>
                        ))}
                    </ul> )
                    : (
                    <li className='list-none ps-4 text-gray-300 text-sm pb-4'>Tom</li>
                    )}
            </div>
        ))}
    </div>

    <div className="mt-8 text-right">
        <button
          type="submit"
          className="py-2 px-6 rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Gem
        </button>
      </div>
    </form>
  );
}
