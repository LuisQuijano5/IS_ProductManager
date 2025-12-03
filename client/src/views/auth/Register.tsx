import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { createAccount } from '../../services/AuthService'
import ErrorMessage from '../../components/ErrorMessage'
import { User } from '../../types'

type RegisterForm = Pick<User, 'name' | 'email'> & { 
    password: string, 
    password_confirmation: string,
    image: string 
}

export default function Register() {
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>()
    const [serverError, setServerError] = useState('')

    const password = watch('password');

    const handleRegister = async (data: RegisterForm) => {
        try {
            await createAccount(data)
            navigate('/auth/login')
        } catch (error) {
            setServerError((error as Error).message)
        }
    }

    return (
        <>
            <h2 className="text-3xl font-black text-slate-700 text-center">Crear Cuenta</h2>
            
            {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

            <form onSubmit={handleSubmit(handleRegister)} className="mt-10 space-y-5" noValidate>
                
                <div>
                    <label className="font-bold text-slate-700 block text-sm" htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                        {...register("name", { required: "El nombre es obligatorio" })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div>
                    <label className="font-bold text-slate-700 block text-sm" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
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

                <div>
                    <label className="font-bold text-slate-700 block text-sm" htmlFor="image">Foto (URL)</label>
                    <input
                        id="image"
                        type="text"
                        placeholder="https://debow.com/foto.jpg"
                        className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                        {...register("image")}
                    />
                </div>

                <div>
                    <label className="font-bold text-slate-700 block text-sm" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                        {...register("password", { 
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'Minimo 8 caracteressss'
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div>
                    <label className="font-bold text-slate-700 block text-sm" htmlFor="password_confirmation">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite tu Password"
                        className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                        {...register("password_confirmation", { 
                            required: "Repetir password es obligatorio",
                            validate: value => value === password || 'Los passwords no son iguales'
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    value="Registrarme"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded-lg transition-colors"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/auth/login" className="block text-center my-2 text-slate-500 uppercase text-sm">
                    Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>
        </>
    )
}