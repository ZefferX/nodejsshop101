import express from 'express'
import { BuyProcessRequest } from '../dto/BuyProcessRequest';
import { buyProcess } from '../useCases/buyingProcess';
import { DevolutionProcessRequest } from '../dto/DevolutionProcessRequest';
import { devolutionProcess } from '../useCases/devolutionProcess';

const useCasesRoutesController = express.Router()

useCasesRoutesController.post('/buy', async (req, res) => {
    const request: BuyProcessRequest = req.body;
    const ticketResponse = await buyProcess(request)
    res.json(ticketResponse)

})

useCasesRoutesController.post('/devolution', async (req, res) =>{
    const request: DevolutionProcessRequest = req.body;
    const devolutionResponse = await devolutionProcess(request)
    res.json(devolutionResponse)
})


export default useCasesRoutesController