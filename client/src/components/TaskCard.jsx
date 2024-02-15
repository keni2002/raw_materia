import {useNavigate} from 'react-router-dom'


export function TaskCard({ t }) {
    const navigate  = useNavigate()
    return (
        <div className='bg-zinc-800 p-3 hover:bg-zinc-700'>


            <div onClick={() =>{
                 navigate(`/tasks/${t.id}`)
            }}>

                <h1>{t.title}</h1>
                <p>{t.description}</p>

            </div>
         

        </div>

    )
    //{tasks.map(t => (
}