// src/api.js
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Importer uuid for at generere unikke ID'er


export const API_URL = 'http://localhost:3001/meals'; // JSON-serverens endpoint

// Funktion til at hente alle måltider
export const fetchMeals = async () => {
    try {
        const response = await axios.get(API_URL);
        // Sørg for at returnere arrayet af måltider
        return response.data; // antager at response.data er et array
    } catch (error) {
        console.error('Error fetching meals:', error);
        return []; // returner et tomt array i tilfælde af fejl
    }
};

// Funktion til at tilføje et nyt måltid
// src/api.js
export const addMeal = async (mealName, ingredients) => {
    const newMeal = {
        id: uuidv4(),
        name: mealName,
        ingredients,
    };

    const response = await axios.post(API_URL, newMeal);
    console.log('Added meal:', response.data); // Log det tilføjede måltid
    return response.data; // Returnér det tilføjede måltid
};


// Funktion til at opdatere et måltid
// src/api.js
export const updateMeal = async (id, updatedMeal) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedMeal);
        return response.data; // Sørg for, at dette er det opdaterede måltid
    } catch (error) {
        console.error('Error updating meal:', error);
        throw new Error('Error updating meal', error);
    }
};



// Funktion til at slette et måltid
export const deleteMeal = async (mealId) => {
    try {
        const response = await axios.delete(`${API_URL}/${mealId}`);
        return response;
    } catch (error) {
        throw new Error('Error deleting meal:', error);
    }
};
