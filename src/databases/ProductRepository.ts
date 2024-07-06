import { connect } from "../configuration/databaseConfig";
import {ProductModel} from '../model/ProductTypes'


export async function getProducts (): Promise<ProductModel[]>{
    const [allProductsData] = await connect.query('SELECT * FROM products')
    return allProductsData as ProductModel[]
}

export async function createNewProduct(newProduct: ProductModel){
    const query = `INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)`;
    const values = [newProduct.name, newProduct.price, newProduct.quantity]

    try {
        const [result] = await connect.query(query, values)
        console.log('New product succesfully created');
        return result
    } catch (error){
        console.error('Error creating product', error)
        throw error;
    }
}

export async function findProductById(id: number){
    let [productInformation] = await connect.query('SELECT * FROM products WHERE id=?', [id])
    return productInformation
}

export async function changeProductValues(id: number, updatedProduct: Partial<ProductModel>){
    const query = 'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?';
    const values = [updatedProduct.name, updatedProduct.price, updatedProduct.quantity, id]

    try {
        const [result] = await connect.query(query, values)
        console.log('Product successfully updated');
        return result;
    } catch (error) {
        console.error('Error updating product', error);
        throw error
    }
    
}

export async function updateProductStockRepository(id: number, quantity: number){
    let query = 'UPDATE products SET quantity = ? WHERE id = ?';
    let values = [quantity, id]
    await connect.query(query,values)

}

