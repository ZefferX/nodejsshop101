export enum Weather {
    Sunny= 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Windy = 'windy',
    Stormy = 'stormy'
}

export enum Visibility{
    Great = 'great',
    Good = 'good', 
    Ok = 'ok', 
    Poor = 'poor'
}

export interface DiaryEntry {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment: string
}

export interface UserModel {
    id: number,
    name: string,
    age: number,
    email: string
}

//Esta linea podria servir en JAVA? con su propio estilo
// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
