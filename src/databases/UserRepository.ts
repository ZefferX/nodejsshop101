import {connect} from '../configuration/databaseConfig'

export async function getAllUsers (){
    const allUsersData = await connect.query('SELECT * FROM user')
    return allUsersData[0]
}