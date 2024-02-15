import {useForm} from 'react-hook-form'
import { createTasks, deleteTask,getSingle,updateTask } from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from 'react';
import {toast} from "react-hot-toast"

export function TaskFormPage() {
    const {register, handleSubmit, formState:{errors}, setValue} = useForm();
    const navigate = useNavigate()
    const params = useParams()
    const onSubmit = handleSubmit( async data => {
        if (params.id) {
             
            updateTask(params.id, data)
          
        }else {
            await createTasks(data)
            toast.success('Tarea Creada')
        }
        navigate('/tasks');
    })
    useEffect(() => {
        async function loadTask() {
            if(params.id) {
                const resp  = await getSingle(params.id)
                setValue('title', resp.data.title)
                setValue('description', resp.data.description)
            }
        
        }
        loadTask()
    },[])
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="title"
                {...register('title', {required: true})}/>
                {errors.title && <p>Este campo es requerido</p> }
                <textarea
                name="" 
                id=""
                cols="30"
                rows="10"
                placeholder='Description here'
                {...register("description", { required: true})}
                
                ></textarea>
                {errors.description && <p>Este campo es requerido</p> }
                <button>Save</button>
                {
                    params.id && 
                    <button onClick={ async () => {
                        const acept = window.confirm('are you sure?')
                        if (acept) {
                            await deleteTask(params.id)
                            navigate('/tasks')
                        }
                    }}>
                        DELETE
                    </button>
                }
            </form>
        </div>
    )
}