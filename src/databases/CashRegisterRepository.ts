
import { connect } from "../configuration/databaseConfig";
import { CashRegisterModel } from "../model/CashRegisterTypes";




export async function getLastCashRegister(): Promise <CashRegisterModel | null>{
    const query = 'SELECT * FROM cashRegister ORDER BY id DESC LIMIT 1';
    try {
        const [register] = await connect.query(query);
        const result = register as any[]
        if (result.length > 0){
        const lastRecord: CashRegisterModel ={
            id: result[0].id,
            money: result[0].money
        }
        return lastRecord
    } else {
        return null;
        }
    } catch (error){
        console.error('Error finding the last entry', error)
        throw error;
    }
}

export async function newSaleCashRegister(newCash: number){
    const query = `INSERT INTO cashRegister (money) VALUES (?)`;
    const values = newCash

    try {
        const [result] = await connect.query(query, values)
        console.log('New sale succesfully executed');
        return result
    } catch (error){
        console.error('Error executing sale', error)
        throw error;
    }
}


export async function createCashRegisterEntry(money: number): Promise<void> {
    try {
        // Obtener la última entrada de la caja
        const lastRegister = await getLastCashRegister();
        if (!lastRegister) {
            throw new Error('No previous cash register entry found');
        }

        // Sumar el nuevo dinero al total anterior
        const newTotal = lastRegister.money + money;

        if (typeof newTotal !== 'number' || isNaN(newTotal)) {
            throw new Error('El valor calculado de newTotal no es un número');
        }

        // Crear una nueva entrada en la caja con el nuevo total
        const insertQuery = 'INSERT INTO cashRegister (money) VALUES (?)';
        await connect.query(insertQuery, [newTotal]);

    } catch (error) {
        console.error('Error adding money to cash register', error);
        throw error;
    }
}
   
    

//necesitamos actualizar dinero de la caja