import { Router } from 'express';
import { body, param } from 'express-validator'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product'
import { handleInputErrors } from './middleware';

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Products:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

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

router.delete('/:id', 
    param('id')
        .isInt().withMessage('ID no valido')
        .notEmpty().withMessage('El ID del producto no puede ir vacio'),
    handleInputErrors,
    deleteProduct);

export default router;