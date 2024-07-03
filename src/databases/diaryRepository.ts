import {connect} from '../configuration/databaseConfig'
import { NewDiaryEntry } from '../types'

export async function getDiaries (){
    const allDiariesData = await connect.query('SELECT * FROM diaries')
    return allDiariesData[0]
}

/*export async function createNewDiary (newDiaryEntry: NewDiaryEntry){
    const allDiariesData = await connect.query(`INSERT INTO diaries (dateAt, weather, visibility, comment) values(${newDiaryEntry.date}, ${newDiaryEntry.weather}, ${newDiaryEntry.visibility}, ${newDiaryEntry.comment})`)
    console.log('consulta')
    return allDiariesData[0] 
}*/

export async function createNewDiary(newDiaryEntry: NewDiaryEntry){
    const query = `INSERT INTO diaries (dateAt, weather, visibility, comment) VALUES (?, ?, ?, ?)`;
    const values = [newDiaryEntry.date, newDiaryEntry.weather, newDiaryEntry.visibility, newDiaryEntry.comment]

    try {
        const [result] = await connect.query(query, values)
        console.log('New entry succesfully created');
        return result;
    } catch (error) {
        console.error('Error executing query', error)
        throw error;
    }
}