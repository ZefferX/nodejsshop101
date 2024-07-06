import express from 'express'
import { addNewEntry, getLastCashRegisterEntry } from '../services/CashRegisterService'

const cashRegisterController = express.Router()

cashRegisterController.get('/get', async (_request, response)=>{
    response.send(await getLastCashRegisterEntry())
})

cashRegisterController.post('/create', async (request, response)=>{
    const { money } = request.body;
    try {
        if (typeof money !== 'number' || isNaN(money)) {
            throw new Error('Invalid input: money must be a number');
        }
        await addNewEntry(money);
        response.status(201).json({ message: 'New entry created successfully' });
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: 'Error in creating new entry', error: error.message });
        } else {
            response.status(500).json({ message: 'Error in creating new entry' });
        }
    }
})

export default cashRegisterController