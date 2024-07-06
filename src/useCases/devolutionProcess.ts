//Crear funcion 
/* Definir que necesito de esa funcion
definir que devuelve esa funcion
paso 0: peticion de devolucion HTTP
paso 1: obtener ticket
paso 2: validar si existe
paso 3: validar producto y cantidad comprada
paso 4: validar si devuelve un monto mayor a lo comprado (En ese caso debe fallar)
paso 5: revisar el dinero disponible en caja, en caso de no tener suficiente, debe fallar
paso 6: Si todo es correcto, procesar ticket de devolucion
paso 7: restar monto en caja
paso 8: aumentar monto en el stock disponible
Paso 9: aumentar dinero del cliente
paso 10: guardar ticket en la base de datos

returnar el ticket para mostrarlo al cliente
*/

import { CompletedDevolutionTicket } from "../dto/CompletedDevolutionTicket";
import { DevolutionProcessRequest } from "../dto/DevolutionProcessRequest";
import { findCashRegisterEntry, getLastCashRegisterEntry } from "../services/CashRegisterService";
import { getProductById, updateProductStock } from "../services/ProductService";
import { addNewDevolutionTicket, findTicketByiD } from "../services/TicketService";
import { getUserByIdService, updateUserMoneyService } from "../services/UserService";

//paso 0

export async function devolutionProcess(request: DevolutionProcessRequest) {

    //paso 1

    let saleTicket = await findTicketByiD(request.ticketId)

    //Paso 2

    if (!saleTicket) {
        throw new Error("Ticket no encontrado")
    }

    let user = await getUserByIdService(saleTicket.clientId)
    let product = await getProductById(saleTicket.productId)

    if (user == null) throw Error('Usuario no encontrado');
    if (product == null) throw Error('No fue encontrado el detalle de la caja')




    //Paso 3 y 4
    if (request.quantityToReturn > saleTicket.clientQuantityRequired) {
        throw new Error("No puede devolver mas de lo comprado")
    }


    //paso 5
    let totalToReturn = request.quantityToReturn * saleTicket.productPrice

    let currentCashRegister = await getLastCashRegisterEntry()
    if (currentCashRegister == null) throw Error('No fue encontrado el detalle de la caja')
    

    if (currentCashRegister.money < totalToReturn && !request.isFlexibleClient) throw Error("Dinero disponible insuficiente para realizar su devolucion");
    if (currentCashRegister.money < totalToReturn && request.isFlexibleClient) {
        while (currentCashRegister.money < totalToReturn && request.quantityToReturn > 0) {
            request.quantityToReturn--;
            totalToReturn = request.quantityToReturn * saleTicket.productPrice
        }
    }
    if (currentCashRegister.money < totalToReturn) {
        throw Error("Dinero insuficiente en caja para realizar una devolucion")
    }
    // paso 7
    currentCashRegister.money = currentCashRegister.money - totalToReturn
    let newStockRegister = product.quantity + request.quantityToReturn
    let newUserMoneyRegister = user.money + totalToReturn

    updateUserMoneyService(user.id, newUserMoneyRegister)
    updateProductStock(product.id, newStockRegister)
    findCashRegisterEntry(currentCashRegister.money)

    let devolutionResponse: CompletedDevolutionTicket ={
        productId: product.id,
        productName: product.name,
        productPrice: saleTicket.productPrice,
        clientId: user.id,
        clientQuantityRequired: request.quantityToReturn,
        totalReturned: -totalToReturn
    }

    addNewDevolutionTicket(devolutionResponse)

    return devolutionResponse








}