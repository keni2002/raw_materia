import axios from 'axios'
const taskApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/tasks/'
})
export const getAllTasks = () =>{
    return taskApi.get('/')
}

export const getSingle = (id) => {
    return taskApi.get(`/${id}/`)
}

export const createTasks = (task) =>{
    return taskApi.post('/',task)
}
export const deleteTask = (id) => {
    return taskApi.delete(`/${id}/`) 
}
export const updateTask = (id, task) =>taskApi.put(`/${id}/`,task)