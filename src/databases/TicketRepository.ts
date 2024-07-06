import { connect } from "../configuration/databaseConfig";
import { CompletedSaleTicket } from "../dto/CompletedSaleTicket";
import { TicketModel } from "../model/TicketTypes";

export async function getAllTickets(): Promise <TicketModel[]>{
    const [allTicketsData] = await connect.query('SELECT * FROM saleTickets')
    return allTicketsData as TicketModel[]
}

export async function getTicketById(id: number){
    let [ticketData] = await connect.query('SELECT * FROM saleTickets WHERE id =?', id)
    return ticketData as TicketModel[]
}

//Necesitmaos un createNewTicket

export async function createNewTicket(newTicket: CompletedSaleTicket){
    const query = `INSERT INTO saleTickets (productId, productName, productPrice, clientId, clientQuantityRequired, totalSale) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [newTicket.productId, newTicket.productName, newTicket.productPrice, newTicket.clientId, newTicket.clientQuantityRequired, newTicket.totalSale]

    try {
        const [result] = await connect.query(query, values)
        console.log('New Ticket succesfully created');
        return result
    } catch (error){
        console.error('Error creating Ticket', error)
        throw error
    }
}