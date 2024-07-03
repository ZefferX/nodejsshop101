import {getAllUsersService} from '../services/UserService'
import express from 'express'

const controller = express.Router()

controller.get('/getAll', async(_req, res) => {
   const allUsers =  await getAllUsersService()
   res.json(allUsers)

})
//se necesita cambiar esto

export default controller