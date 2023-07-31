<template>
    <div id="weather-module">
        <div id="weather-main">
            <div>
                <img v-if="weatherType != ''" :src="require(`../assets/weather/${weatherType}.png`)" alt="weather icon">
            </div>
            <div id="weather-data">
                <p>{{ temperature }}°C</p>
                <p>{{ location }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchWeather, fetchLocation } from '@/utils/weather.js'
export default {
    data(){
        return {
            token: '',
            location: '',
            country: '',
            temperature: 0,
            weatherType: ''
        }
    },

    async created(){
        this.token = process.env.VUE_APP_WEATHER_API_KEY
        this.location = process.env.VUE_APP_WEATHER_LOCATION
        this.country = process.env.VUE_APP_WEATHER_COUNTRY
        let location = await fetchLocation(this.location, this.country, this.token)
        console.log(location)
        let lat = location['lat']
        let lon = location['lon']
        let [temperature, weathertype] = await fetchWeather(lat,lon,this.token)
        console.log(temperature, weathertype)
        this.temperature = temperature
        this.weatherType = weathertype
    },
}
</script>

<style>
#weather-main{
    display: flex;
}

#weather-data{
    margin: auto;
}

p{
  color: white;
  font-size: xx-large;
}
</style>