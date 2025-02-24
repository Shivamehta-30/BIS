import axios from "axios";
import { BASE_URL } from "./Config";

export const getUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.data.users;
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async (newUser) => {
  try {
    const response = await axios.post(BASE_URL, newUser);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}?userId=${id}`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (updatedData, id) => {
  try {
    const response = await axios.patch(`${BASE_URL}?userId=${id}`, updatedData);
    return response.data.data;    
  } catch (err) { 
    console.error(err);
  }
};
