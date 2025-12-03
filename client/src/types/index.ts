import { object, string, number, boolean, Output, array } from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})
export const ProductsSchema = array(ProductSchema)
export type Product = Output<typeof ProductSchema>

export const UserSchema = object({
    id: number(),
    name: string(),
    email: string(),
    image: string() 
})
export type User = Output<typeof UserSchema>

export const AuthSchema = object({
    token: string()
})
export type Auth = Output<typeof AuthSchema>

export const NewPasswordSchema = object({
    password: string(),
    password_confirmation: string()
})
export type NewPasswordForm = Output<typeof NewPasswordSchema>
