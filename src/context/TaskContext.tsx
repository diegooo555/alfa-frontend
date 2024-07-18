import { useState, createContext, ReactNode } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, updateTaskRequest } from "../api/task";
import { FieldValues } from "react-hook-form";

interface Task{
    id: number,
    title: string,
    description: string,
    datestart: string,
    dateend: string,
}

interface ChildrenProps {
    children: ReactNode,
}

interface TaskContextType {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<{
        id: number;
        title: string;
        description: string;
        datestart: string;
        dateend: string;
    }[]>>,
    getTasks: () => Promise <void>,
    createTask: (task: FieldValues) => Promise<void>,
    updateTask: (id: number, task: FieldValues) => Promise<void>,
    deleteTask: (id: number) => Promise<void>,
}

export const TaskContext = createContext<TaskContextType| null>(null)

export const TaskProvider = ({children}: ChildrenProps) => {

    const [tasks, setTasks] = useState([{
        id: 0,
        title: '',
        description: '',
        datestart: '',
        dateend: '',
    }])

    const getTasks = async () => {
        const res = await getTasksRequest()
        try {
            console.log(res)
            setTasks(res.data)
            console.log(tasks)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task: FieldValues) => {
        try {
            const res = await createTaskRequest(task)
            console.log(res)
            await getTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id: number, task: FieldValues) => {
        try {
            const res = await updateTaskRequest(id, task)
            await getTasks()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id: number) => {
        const res = await deleteTaskRequest(id)
        if(res.status === 204) setTasks(tasks.filter( taskActual => taskActual.id !== id))
    }
    return(
        <TaskContext.Provider value={{tasks, setTasks, getTasks, createTask,updateTask, deleteTask}}>
            {children}
        </TaskContext.Provider>
    )
}