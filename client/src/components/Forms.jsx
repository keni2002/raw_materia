import { Outlet } from "react-router-dom";

export default function Forms_Contrato() {
    return (
        <div className="flex w-full  min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex h-1/3 min-h-full flex-col justify-center px-6 py-12 lg:px-8 shadow-md bg-gray-100 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="overflow-auto">
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    )
}