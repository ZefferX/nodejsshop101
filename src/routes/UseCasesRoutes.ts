import express from 'express'
import { BuyProcessRequest } from '../dto/BuyProcessRequest';
import { buyProcess } from '../useCases/buyingProcess';

const useCasesRoutesController = express.Router()

useCasesRoutesController.post('/buy', async (req, res) => {
    const request: BuyProcessRequest = req.body;
    const ticketResponse = await buyProcess(request)
    res.json(ticketResponse)

})


export default useCasesRoutesController