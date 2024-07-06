import { TicketModel } from '../model/TicketTypes';
import { findAllTickets, findTicketByiD } from '../services/TicketService';
import express from 'express'

const ticketRoutesController = express.Router()


//Endpoint 1

//que son estas lineas de arriba exactamente?

ticketRoutesController.get('/getAll', async (_request, response) =>{
   response.send(await findAllTickets())
})

ticketRoutesController.get('/:id', async (request, response) =>{
   let ticketId = request.params.id
   let ticketIdNumber = Number.parseInt(ticketId)
   let ticketResponse: TicketModel = await findTicketByiD(ticketIdNumber)
   response.json(ticketResponse)
})


export default ticketRoutesController