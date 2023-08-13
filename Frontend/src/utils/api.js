const API_URL = 'http://localhost:3000'

function addEvent(event){
    console.log(event)
    fetch(`${API_URL}/calendar/add`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function getEvents(offset){
    console.log(`getting events for offset: ${offset}`)
    let request = await fetch(`${API_URL}/calendar/${offset}`)
    let response = await request.json()
    console.log(response)
    return response 
}

async function updateLocation(type, location){
    fetch(`${API_URL}/traffic/${type}`, {
        method: 'POST',
        body: JSON.stringify(location),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

async function getLocation(type){
    const request = await fetch(`${API_URL}/traffic/${type}`)
    try {
        const response = await request.json()
        return response
    }catch(exception) {
        return undefined
    }
}

export default {
    addEvent,
    getEvents,
    updateLocation,
    getLocation
}