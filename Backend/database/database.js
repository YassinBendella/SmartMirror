import {MongoClient} from 'mongodb'

export class Database {
    constructor(url, db){
        this.url = url
        this.db = db
    }

    connect(){
        const client = new MongoClient(this.url)
        return client
    }

    async getCalendarItemsBetweenDates(date1,date2){
        const client = this.connect()
        await client.connect()
        const database = client.db(this.db)
        const calendar = database.collection("calendar")

        const calendarItems = calendar.find({date: {
            $gt: date1,
            $lt: date2
        }}).toArray()
        // client.close()
        return calendarItems
    }
}