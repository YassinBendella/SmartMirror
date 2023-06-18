<template>
    <div id="directions-module">
        <h1>Traffic Overview</h1>
        <p>{{ schoolTime }} min to reach your school</p>
        <p>{{ workTime }} min to reach your work</p>
    </div>
</template>

<script>
import {locationStore} from '@/stores/LocationStore.js'
export default {
data(){
    return {
        workTime: 0,
        schoolTime: 0
    }
},

async created(){
    let locationData = locationStore()
    let address = process.env.VUE_APP_DIRECTIONS_CURRENT_ADDRESS
    let school = locationData.school
    let work = locationData.work
    let currentLocation = await this.fetchLocation(address)
    if (school){
        this.schoolTime = await this.fetchDirectionTimes(currentLocation,school)
    }
    if (work){
        this.workTime = await this.fetchDirectionTimes(currentLocation,work)  
    }
},

methods: {
    async fetchLocation(address) {
        // https://docs.mapbox.com/help/getting-started/geocoding/
        let token = process.env.VUE_APP_MAPBOX_API_KEY
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${token}`
        let request = await fetch(url)
        let response = await request.json()
        console.log(response)
        let features = response['features']
        if (features.length > 0){
            let location = features[0]['center']
            return location
        }
        return undefined
    },
    
    async fetchDirections(currentLocation, targetLocation) {
        // https://docs.mapbox.com/api/navigation/directions/
        let token = process.env.VUE_APP_MAPBOX_API_KEY
        let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLocation};${targetLocation}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${token}`
        
        let request = await fetch(url)
        let response = await request.json()
        return response
    },
    
    async fetchDirectionTimes(currentLocation,targetLocation){
        let directions = await this.fetchDirections(currentLocation,targetLocation)
        let routes = directions['routes']
        
        let times = []
        for (let route of routes){
            let routeTime = route['duration']
            times.push(routeTime)
        }
        return Math.round(Math.min(...times)/60)
    }
}
}
</script>

<style>
h1{
    color: white;
}
</style>