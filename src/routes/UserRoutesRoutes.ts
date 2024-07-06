import { UserModel } from '../model/UserTypes'
import {addUser, getAllUsersService, getUserByIdService} from '../services/UserService'
import express from 'express'

const userControllerr = express.Router()

userControllerr.get('/getAll', async(_req, res) => {
   const allUsers =  await getAllUsersService()
   res.json(allUsers)

})

userControllerr.get('/:id', async (request, response) =>{
   let userId = request.params.id
   let userIdNumber = Number.parseInt(userId)
   let userResponse: UserModel = await getUserByIdService(userIdNumber)
   response.json(userResponse)
})


userControllerr.post('/create', async (request, response) =>{
   const newUser= request.body;
   try {
      const createdUser = await addUser(newUser)
      response.status(201).json(createdUser)
   } catch (error) {
      if (error instanceof Error){
         response.status(500).json({ message: 'Error in creating new User', error: error.message});
      } else {
         response.status(500).json({ message: 'Error in creating new user'})
      }
   }
})


export default userControllerr