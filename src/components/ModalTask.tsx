import { useState } from "react";
import {FieldValues, useForm} from 'react-hook-form';

interface WindowQuestion {
  deleteTask: (id: number) => Promise<void>;
  id: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  datestart: string;
  dateend: string;
}

interface StateModalTask {
  state: boolean;
  task: Task | null;
}

interface ModalTask {
  taskModal: StateModalTask;
  setTaskModal: React.Dispatch<React.SetStateAction<{
    state: boolean;
    task: null;
}>>;
  updateTask: (id: number, task: FieldValues) => Promise<void> ;
  deleteTask: (id: number) => Promise<void>;
}

const WindowQuestion = (props: WindowQuestion) => (
  <div className="w-screen h-screen fixed top-0 left-0 z-10 grid">
    <div className="h-[30%] w-[30%] self-center justify-self-center flex flex-col justify-center items-center bg-white gap-2">
      <p>¿Deseas eliminar la tarea?</p>
      <div className='flex justify-around items-center w-full'>
        <button
          onClick={() => {
            props.deleteTask(props.id);
          }}
          className="bg-red-500 p-2 w-[20%] rounded-md"
        >
          Si
        </button>
        <button className="bg-blue-400 p-2 w-[20%] rounded-md">No</button>
      </div>
    </div>
  </div>
);

const ModalTask = (props: ModalTask) => {
  const task = props.taskModal.task;
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [dateStart, setDateStart] = useState(task?.datestart);
  const [dateEnd, setDateEnd] = useState(task?.dateend);
  const [windowQuestion, setWindowQuestion] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
        console.log(data)
        if (task) {
          props.updateTask(task.id, data)
          props.setTaskModal({state: false, task: null})
        }
    })

    return(
        <div className="w-screen h-screen grid fixed top-0 left-0" onClick={() => props.setTaskModal({state: false, task: null})}>
        <form className='justify-self-center self-center w-[45%] h-[80%] bg-white shadow-2xl
         flex flex-col gap-2 dark:border rounded-md p-5' onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
            <button className='self-end bg-gray-400 rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-300' onClick={() => props.setTaskModal({state: false, task: null})} >
                <svg focusable="false" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                </svg>
            </button>
            <input type="text" value={title} className='outline-none border-[gray] border rounded-md p-2' {...register('title')} onChange={(e) => setTitle(e.target.value)}/>
            <textarea id="description" value={description} className='outline-none border-[gray] border rounded-md p-2' {...register('description')} onChange={(e) => setDescription(e.target.value)}/>
            <input type="datetime-local" value={dateStart} className='outline-none border-[gray] border rounded-md p-2' {...register('datestart')} onChange={(e) => setDateStart(e.target.value)}/>
            <input type="datetime-local" value={dateEnd} className='outline-none border-[gray] border rounded-md p-2'  {...register('dateend')} onChange={(e) => setDateEnd(e.target.value)}/>
            <button className='bg-red-600 p-2 rounded-md' onClick={() => {
                setWindowQuestion(true)
            }} type='button'>Eliminar</button>
            
            <button className='bg-green-400 p-2 rounded-md' type='submit'>Guardar</button>
        </form>
        {(windowQuestion && task)&&  (<WindowQuestion deleteTask={props.deleteTask} id={task.id}/>)}
    </div>
    )
};

export default ModalTask;