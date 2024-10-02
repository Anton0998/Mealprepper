import React from 'react';

const SelectedMealsList = ({ selectedMeals, meals }) => {
    const handleCopy = () => {
        const ingredientMap = {};

        // Funktion til at samle ingredienser fra en kategorigruppe
        const collectIngredients = (ingredientCategory) => {
            ingredientCategory.forEach((ingredient) => {
                const { item, amount, unit } = ingredient;

                // Hvis ingrediensen allerede findes, læg mængderne sammen
                if (ingredientMap[item]) {
                    ingredientMap[item].amount += parseFloat(amount); // Saml mængderne
                } else {
                    // Opret ny ingrediens med navn, mængde og enhed
                    ingredientMap[item] = {
                        amount: parseFloat(amount),
                        unit: unit || '' // Hvis ingen enhed er angivet, brug en tom streng
                    };
                }
            });
        };

        // Gå igennem de valgte retter og saml ingredienser fra alle kategorier
        meals.forEach((meal) => {
            if (selectedMeals.includes(meal.id)) {
                const { ingredients } = meal;
                Object.values(ingredients).forEach((ingredientCategory) => {
                    collectIngredients(ingredientCategory); // Saml ingredienserne fra hver kategori
                });
            }
        });

        // Byg tekst til udklipsholderen
        let copyText = 'Indkøbsliste:\n\n';
        Object.entries(ingredientMap).forEach(([ingredient, { amount, unit }]) => {
            copyText += `${ingredient}: ${amount} ${unit}\n`;
        });

        // Kopier teksten til udklipsholderen
        navigator.clipboard.writeText(copyText)
            .then(() => {
                alert('Indkøbsliste kopieret til udklipsholderen!');
            })
            .catch(err => {
                console.error('Fejl ved kopiering:', err);
            });
    };

    return (
        <div>
            <h2 className="text-lg font-semibold">Valgte Retter</h2>
            {selectedMeals.length === 0 ? (
                <p className="text-gray-500">Ingen valgte retter.</p>
            ) : (
                <>
                    <button
                        onClick={handleCopy}
                        className="my-2 px-2 py-1 text-sm border rounded bg-gray-100"
                    >
                        Kopiér Indkøbsliste
                    </button>
                    <ul className="mt-3 divide-y divide-gray-200">
                        {meals
                            .filter((meal) => selectedMeals.includes(meal.id))
                            .map((meal) => (
                                <li
                                    key={meal.id}
                                    className="py-2 flex justify-between items-center"
                                >
                                    <span>{meal.name}</span>
                                </li>
                            ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default SelectedMealsList;
