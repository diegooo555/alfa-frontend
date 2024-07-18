import { FieldValues } from "react-hook-form";
import axios from "./axiosInstance";



export const registerRequest = async (user: FieldValues) => {
    try {
        const response = await axios.post("/register", user);
        return response.data; // Retorna los datos que te devuelva el backend, si es necesario
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (user: FieldValues) => {
    try {
        const response = await axios.post("/login", user);
        return response.data; // Retorna los datos que te devuelva el backend, si es necesario
    } catch (error) {
        console.log(error);
    }
};

export const verifyTokenRequest = async () => {
    try {
        const response= await axios.get("/verify");
        return response.data;
    } catch (error) {
        return error;
    }
}
