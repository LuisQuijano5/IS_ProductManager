import { useState, useContext } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import ErrorMessage from '../../components/ErrorMessage'
import { login, getUser } from '../../services/AuthService' 
import { User } from '../../types'
import { UserContext } from '../../context/UserProvider' 

type UserLoginForm = Pick<User, 'email'> & { password: string, remember: boolean } 

export default function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [serverError, setServerError] = useState('')
    
    const { setUser } = useContext(UserContext)
    
    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginForm>()

    const handleLogin = async (formData: UserLoginForm) => {
        try {
            const token = await login(formData)
            
            if(token) {
                const user = await getUser() 
                if(user) {
                   setUser(user)
                   navigate('/') 
                } else {
                   setServerError("Error al obtener perfil")
                }
            }
        } catch (error) {
            setServerError((error as Error).message)
        }
    }

    return (
        <>
            <h2 className="text-3xl font-black text-slate-700 text-center">Iniciar Sesión</h2>
            
            {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

            <form onSubmit={handleSubmit(handleLogin)} className="mt-10 space-y-5" noValidate>
                
                <div>
                    <label className="font-bold text-slate-700 block text-sm" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Tu Email de Registro"
                        className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: 'Email no válido'
                            }
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div className="relative">
                    <label className="font-bold text-slate-700 block text-sm" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password de Registro"
                        className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                        {...register("password", {
                            required: "El password es obligatorio"
                        })}
                    />
                    
                    <button
                        type="button"
                        className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-6 w-6" />
                        ) : (
                            <EyeIcon className="h-6 w-6" />
                        )}
                    </button>
                    
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id="remember"
                            className="w-4 h-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 rounded"
                            {...register('remember')}
                        />
                        <label htmlFor="remember" className="text-sm text-slate-500">Recordarme</label>
                    </div>

                    <Link to="/auth/olvide-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded-lg transition-colors"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/auth/registro" className="block text-center my-2 text-slate-500 uppercase text-sm">
                    ¿No tienes cuenta? Regístrate
                </Link>
            </nav>
        </>
    )
}