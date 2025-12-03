import { Outlet} from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

export default function Layout() {
    const { user, logout } = useContext(UserContext)

    return (
        <>
            <header className='bg-slate-800 shadow-md'>
                <div className='mx-auto max-w-6xl py-6 flex justify-between items-center px-5'>
                    <h1 className='text-2xl font-extrabold text-white'>
                        Admin Productos
                    </h1>
                    
                    {user && (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-white font-bold text-sm">
                                {user.image ? (
                                    <img 
                                        src={user.image} 
                                        alt={user.name} 
                                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500" 
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span className="hidden md:block">{user.name}</span>
                            </div>

                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
                            >
                                Salir
                            </button>
                        </div>
                    )}
                </div>
            </header>
        
            <main className='mt-10 mx-auto max-w-6xl p-10 bg-white shadow-lg rounded-lg m-5'>
                <Outlet />
            </main>
        </>
    )
}