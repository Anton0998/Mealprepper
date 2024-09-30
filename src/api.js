// src/api.js
import axios from 'axios';

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
export const addMeal = async (mealName, ingredients) => {
    const newMeal = {
      name: mealName,
      ingredients,
    };
  
    // Sender POST-anmodning til JSON-serveren
    return await axios.post(API_URL, newMeal);
  };

// Funktion til at opdatere et måltid
export const updateMeal = async (id, updatedMeal) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedMeal);
    return response.data;
};

// Funktion til at slette et måltid
export const deleteMeal = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
