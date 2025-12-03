import { safeParse } from 'valibot';
import api from "../lib/axios"; 
import { isAxiosError } from 'axios';
import { User, UserSchema, AuthSchema,  NewPasswordForm} from '../types';

type UserLoginForm = Pick<User, 'email'> & { password: string };
type UserRegisterForm = Pick<User, 'name' | 'email'> & { password: string, password_confirmation: string, image?: string };

export async function createAccount(data: UserRegisterForm) {
    try {
        const url = '/api/auth/register';
        const { data: response } = await api.post<string>(url, data);
        return response;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function login(data: UserLoginForm) {
    try {
        const url = '/api/auth/login';
        const { data: token } = await api.post<string>(url, data);
        localStorage.setItem('AUTH_TOKEN', token);
        return token;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUser() {
    try {
        const url = '/api/auth/user';
        const { data } = await api(url);
        const result = safeParse(UserSchema, data);
        if(result.success) {
            return result.output;
        }
    } catch (error) {
        console.log(error);
        return null; 
    }
}

export async function validateToken(token: string) {
    try {
        const url = '/api/auth/validate-token';
        //const { data } = await api.post(url, { token });
        await api.post(url, { token });
        return true; 
    } catch (error) {
        throw new Error('Token no válido');
    }
}

export async function updatePasswordWithToken({token, password}: {token: string, password: string}) {
    try {
        const url = `/api/auth/reset-password/${token}`;
        const { data } = await api.post(url, { password });
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}