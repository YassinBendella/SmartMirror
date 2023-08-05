import express from "express";
import {calendarRoutes} from './routes/calendar.js'
import {trafficRoutes} from './routes/traffic.js'
import cors from 'cors'
import bodyParser from "body-parser";

const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.use('/calendar', calendarRoutes);
app.use('/traffic', trafficRoutes)