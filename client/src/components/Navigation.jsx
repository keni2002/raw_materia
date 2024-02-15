import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav className='flex justify-between py-3'>
            <Link to="/tasks">
                <h1 className='font-bold text-3xl mb-4 text-indigo-500'>Task App</h1>
            </Link>

            <Link to="/tasks/new">
                <button className='bg-indigo-500 p-3 rounded-lg '>
                    New Task
                </button>
            </Link>
            <Link to='/login'>
                <button className='bg-green-800 p-3'>
                    Login
                </button>
            </Link>


        </nav>
    )
}