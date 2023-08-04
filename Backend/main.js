import express from "express";
import {calendarRoutes} from './routes/calendar.js'
import cors from 'cors'
import bodyParser from "body-parser";

const port = 3000

const url = `mongodb+srv://yassin:yassin123@cluster0.1ttwg.mongodb.net/`
const app = express()
app.use(cors())
app.use(bodyParser())

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.use('/calendar', calendarRoutes);