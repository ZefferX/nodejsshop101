import {getAllUsers} from '../databases/UserRepository'

export async function getAllUsersService(){
   return await getAllUsers()
}