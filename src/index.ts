import express from 'express' // estos son ESModules

import diaryRouter from './routes/diaries';
import userRoutes from './routes/UserRoutes';
import ticketRoutesController from './routes/TicketRoutes';
import productController from './routes/ProductRoutes';
import useCasesRoutesController from './routes/UseCasesRoutes';
import cashRegisterController from './routes/CashRegisterRoutes';
import { PORT } from './config';


const app = express()
app.use(express.json()) // middleware que transforla la req body a un json


app.get('/ping', (_req, res) =>{
    
    console.log('some pinged here!! ' + new Date().toLocaleDateString())
    res.send('pong')
})

app.use('/api/diaries', diaryRouter)
app.use('/api/users', userRoutes)
app.use('/api/tickets', ticketRoutesController)
app.use('/api/products', productController)
app.use('/api/useCases', useCasesRoutesController)
app.use('/api/cashRegister', cashRegisterController)

app.listen(PORT, () =>{
    console.log(`server Running on port ${PORT}`)
    
})

