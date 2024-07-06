import { createCashRegisterEntry, getLastCashRegister, newSaleCashRegister } from "../databases/CashRegisterRepository"




export async function getLastCashRegisterEntry() {
    return await getLastCashRegister()

}

export async function findCashRegisterEntry(newValueOfCashRegister: number): Promise<void>{
   await newSaleCashRegister(newValueOfCashRegister)
}

export async function addNewEntry(newCashRegister: number): Promise<void>{
    await createCashRegisterEntry(newCashRegister)
}