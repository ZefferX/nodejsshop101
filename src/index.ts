import express from 'express' // estos son ESModules

import diaryRouter from './routes/diaries';
import userRoutes from './routes/userRoutes';


const app = express()
app.use(express.json()) // middleware que transforla la req body a un json

const PORT = 3000

app.get('/ping', (_req, res) =>{
    
    console.log('some pinged here!! ' + new Date().toLocaleDateString())
    res.send('pong')
})

app.use('/api/diaries', diaryRouter)
app.use('/api/user', userRoutes)

app.listen(PORT, () =>{
    console.log(`server Running on port ${PORT}`)
    
})

