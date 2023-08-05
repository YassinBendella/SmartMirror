import express from 'express'
import { Database } from '../database/database.js'

const calendarRoutes = express.Router();
const url = `mongodb+srv://yassin:yassin123@cluster0.1ttwg.mongodb.net/`
const database = new Database(url, "smartmirror")
calendarRoutes.use(express.json())
calendarRoutes.get('/:offset', async (req,res) => {
    let offset = req.params.offset || 0;
    offset = parseInt(offset);
    if (isNaN(offset)) offset = 0;

    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setDate(today.getDate() + offset)
    
    
    let midnight = new Date();
    midnight.setHours(23);
    midnight.setMinutes(59);
    midnight.setSeconds(59);
    midnight.setDate(midnight.getDate() + offset)

    const items = await database.getCalendarItemsBetweenDates(today,midnight);
    res.send(items);
});

calendarRoutes.post('/add', async (req, res) => {
    let body = req.body;
    let result = await database.insertCalendarItem(body)
    res.send(result);
})

export {
    calendarRoutes
}

