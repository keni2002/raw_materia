import { Outlet } from "react-router-dom";

export default function Forms() {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 shadow-md bg-gray-100 sm:mx-auto sm:w-full sm:max-w-sm">
               <Outlet></Outlet>
            </div>
        </div>
    )
}