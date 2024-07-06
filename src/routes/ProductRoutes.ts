import * as productService from '../services/ProductService'
import express from 'express'

const productController = express.Router()

productController.get('/getAll', async (_request, response) => {
    response.send(await productService.getAllProductsService())
})


productController.get('/:id', async (request, response) => {
    const product = await productService.getProductById(+request.params.id)
    return (product != null)
        ? response.send(product)
        : response.sendStatus(404)
})

productController.post('/create', async (request, response) => {
    const newProduct = request.body;
    try {
        const createdProduct = await productService.addProduct(newProduct)
        response.status(201).json(createdProduct)
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: 'Error in creating a new product', error: error.message });
        } else {
            response.status(500).json({ message: 'Error in creating a new product' });
        }
    }

});


export default productController
