// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/meals'; // JSON-serverens endpoint

// Funktion til at hente alle måltider
export const fetchMeals = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Funktion til at tilføje et nyt måltid
export const addMeal = async (newMeal) => {
    const response = await axios.post(API_URL, newMeal);
    return response.data;
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
