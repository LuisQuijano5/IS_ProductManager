//Crear carpeta de routers mejor yo creo, al final se refactoriza si me acuerdo o alguien lee esto 

import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, getUser, login } from './handlers/auth';
import { handleInputErrors } from './middleware'; 
import { authenticate } from './middleware/auth';

const router = Router();

router.post('/register',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('password').isLength({ min: 8 }).withMessage('El password debe ser de al menos 8 caracteres'),
    body('email').isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    createAccount
);

router.post('/login',
    body('email').isEmail().withMessage('E-mail no válido'),
    body('password').notEmpty().withMessage('El password es obligatorio'),
    handleInputErrors,
    login
);

router.get('/user', authenticate, getUser);

export default router;