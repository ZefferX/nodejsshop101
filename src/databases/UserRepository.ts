import {connect} from '../configuration/databaseConfig'
import { UserModel } from '../model/UserTypes'

//Necesitmaos buscar por ID

export async function getUserById(id: number){
    let [userInformation] = await connect.query('SELECT * FROM users WHERE id=?', id)
    return userInformation as UserModel[]
}

//Tambien actualizar dinero del cliente por id

export async function updateUserMoney(id: number, money: number){
    let query = 'UPDATE users SET money = ? WHERE id = ?';
    let values = [money, id]
    await connect.query(query,values)

}


export async function getAllUsers (): Promise<UserModel[]>{
    const [allUsers] = await connect.query('SELECT * FROM users')
    return allUsers as UserModel[]
}

export async function createNewUser (newUser: UserModel){
    const query = `INSERT INTO users (name, age, email, money) VALUES (?, ?, ?, ?)`;
    const values = [newUser.name, newUser.age, newUser.email, newUser.money]

    try {
        const [result] = await connect.query(query, values)
        console.log('New User succesfully created');
        return result
    } catch (error){
        console.error('Error creating new User', error)
        throw error;
    }
}

