import { createNewUser, getAllUsers, getUserById, updateUserMoney } from '../databases/UserRepository'
import { UserModel } from '../model/UserTypes'

export async function getAllUsersService() {
   return await getAllUsers()
}

export async  function getUserByIdService(userId: number):Promise<UserModel> {
   let foundUser = await getUserById(userId)
   return foundUser[0]
}

export async function updateUserMoneyService(id: number, money: number): Promise <void>{
   await updateUserMoney(id, money);
}

export const addUser = async (newUser: UserModel): Promise<string>=>{
   await createNewUser(newUser)
   return "Usuario creado correctamente"
}

