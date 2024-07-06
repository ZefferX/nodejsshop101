import { BuyProcessRequest } from "../dto/BuyProcessRequest";
import { CompletedSaleTicket } from "../dto/CompletedSaleTicket";
import { findCashRegisterEntry, getLastCashRegisterEntry } from "../services/CashRegisterService";
import { getProductById, updateProductStock } from "../services/ProductService";
import { addNewTicket } from "../services/TicketService";
import {getUserByIdService, updateUserMoneyService} from '../services/UserService'

//Crear funcion 
/* Definir que necesito de esa funcion
definir que devuelve esa funciona
paso 1: obtener producto por id, obtener por cliente id
paso 2: validar edad mayor a 18
paso 3: validar la cantidad si es mayor a la disponible
paso 4: validad dinero del cliente si es mayor a lo que desea comprar
paso 5: si cumple con todas las condiciones entonces
 paso 5.1: restar dinero del cliente
 paso 5.2: sumar dinero a la caja
 paso 5.3: restar cantidad comprada al stock disponible del producto
 paso 5.4: guardar todos los nuevos datos en sus respectivas bases de datos llamando a sus servicios (No a sus repositorios)
Paso 6: Crear un nuevo ticket que contenga todos los datos de la compra (producto, client, totalventa) 
paso 7: guardar ticket en la base de datos


returnar el ticket para mostrarlo al cliente en el postman
*/
// import {ProductServiceI} from '../services/ProductService'
 


export async function buyProcess(request: BuyProcessRequest){
    //paso 1:
    let product = await getProductById(request.productId)
    if (product == null) throw Error('No puede continuar, producto inexistente')
    let client = await getUserByIdService(request.clientId)
    
    //paso 2:
    if (client.age < 18 ) throw Error("Cliente no cumple con la edad requerida");

    //paso 3:
    if (request.quantity > product.quantity && !request.isFlexibleClient) throw Error ("Cantidad buscada no disponible");
    
    let quantityToBuy = request.quantity

    if (request.quantity > product.quantity && request.isFlexibleClient) quantityToBuy = product.quantity

    let saleTotal = quantityToBuy * product.price
    
    //Paso 4
    if (client.money < saleTotal) throw Error ("Dinero insuficiente para realizar su compra");

    //Paso 5.1

    client.money = client.money - saleTotal;

    //paso 5.2
    let lastCashRegister = await getLastCashRegisterEntry()

    if (lastCashRegister == null) throw Error('Registro de caja no encontrado')

    lastCashRegister.money = lastCashRegister.money + saleTotal
    
    //paso 5.3

    product.quantity = product.quantity - quantityToBuy

    //paso 5.4

    await updateUserMoneyService(request.clientId, client.money)
    await updateProductStock(product.id, product.quantity)
    await findCashRegisterEntry(lastCashRegister.money)
    
    //Paso 6:
    let ticketResponse: CompletedSaleTicket = {
        productId: product.id,
        productPrice: product.price,
        productName: product.name,
        clientId: client.id,
        clientQuantityRequired: quantityToBuy,
        totalSale: saleTotal
    };

    //Paso 7:

    addNewTicket(ticketResponse)

    return ticketResponse



    






    
    



          



   
    

}
