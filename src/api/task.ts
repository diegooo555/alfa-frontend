import { FieldValues } from "react-hook-form";
import axios from "./axiosInstance";


export const getTaskRequest = async (id:number | string) => axios.get(`/task/${id}`)

export const getTasksRequest = async () => axios.get('/tasks');

export const createTaskRequest = (task: FieldValues) => axios.post('/tasks', task);

export const updateTaskRequest = async (id:number | string, task: FieldValues) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id:number | string) => axios.delete(`task/${id}`)