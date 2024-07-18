import axios from "./axiosInstance";

interface Task{
    title: string;
    description: string,
    datestart: string,
    dateend: string,
}


export const getTaskRequest = async (id:number | string) => axios.get(`/task/${id}`)

export const getTasksRequest = async () => axios.get('/tasks');

export const createTaskRequest = (task: Task) => axios.post('/tasks', task);

export const updateTaskRequest = async (id:number | string, task: Task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id:number | string) => axios.delete(`task/${id}`)