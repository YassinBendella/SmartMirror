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

    async getLocation(type){
        const client = this.connect()
        await client.connect()
        const database = client.db(this.db)
        const traffic = database.collection("traffic")

        const location = traffic.findOne({'type': type})
        return location
    }

    async updateLocation(type, location){
        const client = this.connect()
        await client.connect()
        const database = client.db(this.db)
        const traffic = database.collection("traffic")

        const result = await traffic.updateOne({"type": type}, {$set: {'lat': location.lat, 'lon': location.lon, 'type': type}}, {upsert: true});
        return result
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

    async insertCalendarItem(event){
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let name = event.name;
        let hour = event.hour;
        let minute = event.min;
        let dayOfMonth = event.day;
        let month = months.indexOf(event.month);

        if (month == -1){
            return undefined;
        }

        let date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        date.setDate(dayOfMonth);
        date.setMonth(month);
        const client = this.connect();
        await client.connect();
        const database = client.db(this.db);
        const calendar = database.collection("calendar");
        const result = await calendar.insertOne({'name': name, 'date': date});
        return result
    }
}