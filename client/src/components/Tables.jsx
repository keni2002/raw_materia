import { useDispatch,useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
export default function Tables({ columns, data}) {
    const dispatch = useDispatch();
    const { tipo } = useSelector(state => state.booleanos);
    
    return (
        <>
            <div className='mt-3 sm:w-full md:w-11/12 shadow-md bg-gray-300 '>
                <DataTable

                    title={tipo}
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    )
}