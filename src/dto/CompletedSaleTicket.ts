export interface CompletedSaleTicket{
    productId: number,
    productPrice: number,
    productName: string,
    clientId: number,
    clientQuantityRequired: number,
    totalSale: number
}