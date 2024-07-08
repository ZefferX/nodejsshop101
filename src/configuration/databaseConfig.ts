import { createPool } from 'mysql2/promise'
import { 
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
 } from '../config'


export const connect = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: defineDataBasePort(DB_PORT),
    database: DB_NAME
})

function defineDataBasePort(dbport: string | undefined){
    if (dbport == undefined)
        return 3306
    return parseInt(dbport)
    }

