import { useEffect, useState } from "react"
import {getAllTasks } from '../api/tasks.api'
import {TaskCard} from './TaskCard'
export function TasksList() {
    const [tasks,setTasks] = useState([])
    useEffect(()=>{
        





       async function loadTasks(tasks) {
            const res= await getAllTasks()
            setTasks(res.data)
        }
        loadTasks()
    },[])




    console.log(tasks)
    return (
        <div className="grid grid-cols-3 gap-3">
            {
            tasks.map((t) => (
                <TaskCard key={t.id} t = {t}/>
            ))
            };

        </div>
    )
}