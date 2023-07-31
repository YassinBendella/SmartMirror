import express from "express";
import { Database } from './database/database.js'
const port = 3000
const url = `mongodb+srv://yassin:yassin123@cluster0.1ttwg.mongodb.net/`


const app = express()
const database = new Database(url, "smartmirror")

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.get("/", async (req,res) => {
    let today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)

    
    let midnight = new Date()
    midnight.setHours(23)
    midnight.setMinutes(59)
    midnight.setSeconds(59)

    const items = await database.getCalendarItemsBetweenDates(today,midnight)
    console.log(items)
    res.send(items)
})