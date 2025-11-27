import { Router } from 'express';
import { body, param } from 'express-validator'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product'
import { handleInputErrors } from './middleware';

const router = Router();

router.get('/', getProducts);

router.get('/:id', 
    param('id')
        .isInt().withMessage('ID no valido')
        .notEmpty().withMessage('El ID del producto no puede ir vacio'),
    handleInputErrors,
    getProductById);

router.post('/', 
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct);

router.put('/:id', 
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Disponibilidad no valida'),
    param('id')
        .isInt().withMessage('ID no valido')
        .notEmpty().withMessage('El ID del producto no puede ir vacio'),
    handleInputErrors,
    updateProduct);

router.patch('/:id', 
    param('id')
        .isInt().withMessage('ID no valido')
        .notEmpty().withMessage('El ID del producto no puede ir vacio'),
    handleInputErrors,
    updateAvailability);

router.patch('/:id', 
    param('id')
        .isInt().withMessage('ID no valido')
        .notEmpty().withMessage('El ID del producto no puede ir vacio'),
    handleInputErrors,
    updateAvailability);

router.delete('/:id', 
    param('id')
        .isInt().withMessage('ID no valido')
        .notEmpty().withMessage('El ID del producto no puede ir vacio'),
    handleInputErrors,
    deleteProduct);

export default router;