import { changeProductValues, createNewProduct, getProducts, findProductById, updateProductStockRepository } from "../databases/ProductRepository";
import { ProductModel } from "../model/ProductTypes";


export async function getAllProductsService(){
    return await getProducts()
}


export async function getProductById(productId: number): Promise<ProductModel | null> {
    let foundProduct = await findProductById(productId) as ProductModel[]
    return foundProduct.length > 0 ? foundProduct[0]  : null;

}   
export const addProduct = async (newProduct: ProductModel): Promise<string> =>{
    await createNewProduct(newProduct)
    return "Producto creado correctamente"
}


export async function updateProductInformation(productId: number, updatedProduct: Partial<ProductModel>) {
    return await changeProductValues(productId, updatedProduct)
}

export async function updateProductStock(id: number, quantity: number):Promise<void> {
    await updateProductStockRepository(id, quantity)
}