import express from 'express'
import { Database } from '../database/database.js'

const trafficRoutes = express.Router();
const url = `mongodb+srv://yassin:yassin123@cluster0.1ttwg.mongodb.net/`
const database = new Database(url, "smartmirror")
trafficRoutes.use(express.json())
trafficRoutes.get('/:type', async (req,res) => {
    let type = req.params.type || '';

    const location = await database.getLocation(type);
    res.send(location);
});

trafficRoutes.post('/:type', async (req, res) => {
    let body = req.body;
    let type = req.params.type
    let result = await database.updateLocation(type,body)
    res.send(result);
})

export {
    trafficRoutes
}