import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../components/ErrorMessage'
import { validateToken, updatePasswordWithToken } from '../../services/AuthService'

export default function NewPassword() {
    const { token } = useParams()
    const [isValidToken, setIsValidToken] = useState(false)
    const [tokenChecked, setTokenChecked] = useState(false) 
    const [passwordModificado, setPasswordModificado] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: { password: '' }})

    useEffect(() => {
        const checkToken = async () => {
            try {
                if(token) await validateToken(token)
                setIsValidToken(true)
            } catch (error) {
                setIsValidToken(false)
            } finally {
                setTokenChecked(true)
            }
        }
        checkToken()
    }, [])

    const handlePassword = async (data: {password: string}) => {
        if(token) {
            try {
                await updatePasswordWithToken({ token, password: data.password })
                setPasswordModificado(true)
            } catch (error) {
                console.log(error)
            }
        }
    }

    if(!tokenChecked) return null;

    return (
        <>
            <h2 className="text-3xl font-black text-slate-700 text-center">Reestablecer Password</h2>
            <p className="text-xl font-light text-slate-500 text-center mt-5 mb-10">
                Ingresa tu nuevo password
            </p>

            {!isValidToken ? (
                 <div className="text-center">
                    <ErrorMessage>Token no válido o expirado</ErrorMessage>
                    <Link to="/auth/olvide-password" className="text-indigo-600 font-bold block mt-5">
                        Volver a intentar
                    </Link>
                 </div>
            ) : (
                <>
                    {passwordModificado ? (
                         <div className="text-center">
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 font-bold">
                                Password guardado corrctamente
                            </div>
                            <Link to="/auth/login" className="text-indigo-600 font-bold block mt-5 text-xl">
                                Iniciar Sesión
                            </Link>
                         </div>
                    ) : (
                        <form onSubmit={handleSubmit(handlePassword)} className="space-y-5" noValidate>
                            <div>
                                <label className="font-bold text-slate-700 block text-sm" htmlFor="password">Nuevo Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Nuevo Password"
                                    className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                                    {...register("password", { 
                                        required: "El password es obligatorio",
                                        minLength: { value: 8, message: 'Mínimo 8 caracteresssss' }
                                    })}
                                />
                                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                            </div>

                            <input
                                type="submit"
                                value="Guardar Nuevo Password"
                                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded-lg"
                            />
                        </form>
                    )}
                </>
            )}
        </>
    )
}