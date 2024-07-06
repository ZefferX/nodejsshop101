export interface TicketModel {
    ticketId: number,
    productId: number,
    productName: string,
    productPrice: number,
    clientId: number,
    clientQuantityRequired: number,
    totalSale: number
}