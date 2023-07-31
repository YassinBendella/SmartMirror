<template>
    <div class="page" id="weather-overview">
        <div id="weather-header">
            <div>
                <div>
                    <img class="daily-img" v-if="weatherType != ''" :src="require(`../assets/weather/${weatherType}.png`)" alt="weather icon">
                </div>
                <div>
                    <p>{{ temperature }}°C</p>
                    <p>{{ location }}</p>
                </div>
            </div>
        </div>
        <div id="weather-body">
            <div id="weather-body-header">
                <div class="row">
                    <div v-for="hourly in hourlyForecast" :key="hourly.hour">
                        {{ hourly.hour.pad(2) }}h
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div v-for="hourly in hourlyForecast" :key="hourly.hour">
                        {{ hourly.temperature.pad(2)}} °C
                    </div>
                </div>
            </div>

            <div id="weather-body-body">
                <h2>WEATHER FORECAST {{ location }}</h2>
                <hr>
                <div id="daily-data">
                    <div v-for="daily in dailyForecast" :key="daily.day" class="row">
                        <p>{{ daily.day }}</p>
                        <img class="daily-img" v-if="daily.weatherType != ''" :src="require(`../assets/weather/${daily.weatherType}.png`)" alt="weather icon">
                        <div>
                            <p>{{ daily.max }} °C</p>
                            <p>{{ daily.min }} °C</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getParsedForecast, fetchLocation } from '@/utils/weather.js'
export default {
    data(){
        return {
            temperature: 0,
            weatherType: '',
            location: '',
            hourlyForecast: [],
            dailyForecast: []
        }
    },
    async created(){
        let token = process.env.VUE_APP_WEATHER_API_KEY
        this.location = process.env.VUE_APP_WEATHER_LOCATION
        let country = process.env.VUE_APP_WEATHER_COUNTRY
        let currentLocation = await fetchLocation(this.location, country, token)
        console.log(location)

        let lat = currentLocation['lat']
        let lon = currentLocation['lon']
        let [hourlyForecast, dailyForecast] = await getParsedForecast(lat,lon, 5, 4,token)
        console.log(dailyForecast)
        this.temperature = hourlyForecast[0]['temperature']
        this.weatherType = hourlyForecast[0]['weatherType']

        this.dailyForecast = dailyForecast
        this.hourlyForecast = hourlyForecast
    }
}
</script>

<style scoped>
#weather-overview{
    display: flex;
    flex-direction: column;

    gap: 2vh;
}
#weather-body{
    display: flex;
    flex-direction: column;
    gap: 2vh;
}
h2{
    color: white;
}

.row{
    text-align: right;
    display: flex;
    color: white;
    gap: 0.5vw;
    justify-content: space-between;
}

#weather-body{
    margin: auto;
    margin-top: 3vh;
    width: 50vw;
}

.daily-img{
    width: 5vw;
    height: 5vw;
}

#weather-header > div{
    margin-top: 2vh;
    display: flex;
    gap: 1vw;
    justify-content: center;
}
</style>