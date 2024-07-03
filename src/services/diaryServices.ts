import { DiaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry } from '../types'
import {createNewDiary, getDiaries} from '../databases/diaryRepository'
import dairyData from './diaries.json'

const diaries: Array<DiaryEntry> = dairyData as Array<DiaryEntry>

export const getEntries = () => diaries

export async function getAllDiaries(){
    return await getDiaries()
}

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
    const entry = diaries.find(d => d.id == id)
    if (entry != null) {
        const { comment, ...restOfDiary } = entry
        return restOfDiary
    }
    return undefined
    
}

export const getEntriesWithoutSensitiveInfo = (): Array<NonSensitiveInfoDiaryEntry> => {
    return diaries.map(({id, date, weather, visibility}) => {
        return {
            id,
            date,
            weather,
            visibility
        }
        
    })
}




export const addDiary = async (newDiaryEntry: NewDiaryEntry) => {
    const result= await createNewDiary(newDiaryEntry)

    return result
} 
