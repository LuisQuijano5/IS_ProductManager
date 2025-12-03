import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className="max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-5 lg:p-10 text-center md:text-left">
            <h1 className="text-4xl font-black text-slate-800 mb-5">
                Administrador de <span className="text-indigo-600">Productos</span>
            </h1>
            <p className="text-xl font-medium text-slate-500">
                Proyecto de IS
            </p>
        </div>
        
        <div className="md:w-1/2 w-full p-5 lg:p-10 bg-white shadow-xl rounded-lg">
            <Outlet />
        </div>
    </main>
  )
}