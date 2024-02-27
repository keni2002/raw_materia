import DataTable from 'react-data-table-component';

export default function Tables({columns,data,name}) {
    return (
        <>
            <div className='mt-3 sm:w-full md:w-11/12 shadow-md bg-gray-300 '>
                <DataTable
                    title={name}
                    columns={columns}
                    data={data}
                    pagination
                    dense
                />
            </div>
        </>
    )
}