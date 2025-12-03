import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import api from '../../lib/axios' 

export default function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm<{email: string}>()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleRequest = async (data: {email: string}) => {
        try {
            const { data: resMsg } = await api.post('/api/auth/forgot-password', data)
            setMessage(resMsg)
            setError('')
        } catch (e: any) {
            setError(e.response?.data?.error || 'Hubo un error')
            setMessage('')
        }
    }

    return (
        <>
            <h2 className="text-3xl font-black text-slate-700 text-center">Recuperar Acceso</h2>
            
            {message && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 text-center font-bold">{message}</div>}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <form onSubmit={handleSubmit(handleRequest)} className="mt-10 space-y-5" noValidate>
                <div>
                    <label className="font-bold text-slate-700 block text-sm" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Tu Email de Registro"
                        className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                        {...register("email", { required: "El email es obligatorio" })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
                <input type="submit" value="Enviar Instrucciones" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded-lg" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/auth/login" className="block text-center my-2 text-slate-500 uppercase text-sm">Ya tienes cuenta? Inicia Sesión</Link>
                <Link to="/auth/registro" className="block text-center my-2 text-slate-500 uppercase text-sm">No tienes cuenta? Regístrate</Link>
            </nav>
        </>
    )
}