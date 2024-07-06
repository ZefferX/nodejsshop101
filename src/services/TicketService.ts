import { createNewTicket, getAllTickets, getTicketById } from "../databases/TicketRepository";
import { CompletedDevolutionTicket } from "../dto/CompletedDevolutionTicket";
import { CompletedSaleTicket } from "../dto/CompletedSaleTicket";
import { TicketModel } from "../model/TicketTypes";


export async function findAllTickets(){
    return await getAllTickets()
}

export async function findTicketByiD(saleTicketId: number): Promise<TicketModel>{
    let foundTicket = await getTicketById(saleTicketId)
    return foundTicket[0] 
}

export async function addNewTicket(newTicket: CompletedSaleTicket): Promise<string>{
    await createNewTicket(newTicket)
    return "Ticket creado correctamente"
};

export function addNewDevolutionTicket(newTicket: CompletedDevolutionTicket): void{
    console.log(newTicket)
};



