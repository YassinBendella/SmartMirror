async function fetchLocation(location, country, token){
    // https://openweathermap.org/api/geocoding-api
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${location},${country}&limit=5&appid=${token}`
    let request = await fetch(url)
    let response = await request.json()
    let lat = undefined
    let lon = undefined
    lat = response[0]['lat']
    lon = response[0]['lon']
    return {'lat': lat, 'lon': lon}
}

async function fetchWeather(lat,lon,token){
    // https://openweathermap.org/current
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`
    let weather_request = await fetch(url)
    let weather_response = await weather_request.json()
    
    // tempertur is default in kelvin
    let temperature = weather_response['main']['temp']
    // convert from kelvin to celsius 
    temperature += -272.15
    temperature = Math.round(temperature)

    let weatherType = weather_response['weather'][0]['main']

    return [temperature, weatherType]
}

async function getParsedForecast(lat,lon,nHours,nDays,token){
    let [hourly, daily] = await fetchForecast(lat,lon,token)
    let hourlyParsed = []
    let dailyParsed = []

    console.log(hourly)
    let hourCounter = 0
    for (let hourEntry of hourly){
        if (hourCounter >= nHours) break;

        let date = new Date(hourEntry['dt'] * 1000)
        let hour = date.getHours()
        let temperature = Math.round(hourEntry['temp'] - 272.15)

        let weatherType = hourEntry['weather'][0]['main']

        hourlyParsed.push({'hour': hour, 'temperature': temperature, 'weatherType': weatherType})
        hourCounter += 1
    }
    let dayCounter = 0
    let dayMap = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    for (let dayEntry of daily){
        if (dayCounter >= nDays) break;
        let date = new Date(dayEntry['dt'] * 1000)
        let day = dayMap[date.getDay()]

        let weatherType = dayEntry['weather'][0]['main']
        let minTemp = Math.round(dayEntry['temp']['min'] - 272.15)
        let maxTemp = Math.round(dayEntry['temp']['max'] - 272.15)

        dailyParsed.push({'day': day, 'weatherType': weatherType, 'min': minTemp, 'max': maxTemp})
        dayCounter += 1
    }
    return [hourlyParsed, dailyParsed]
}

async function fetchForecast(lat,lon,token){
        // https://openweathermap.org/current
        let part = 'alerts,minutely'
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${token}`
        let forecast_request = await fetch(url)
        let forecast_response = await forecast_request.json()
        
        let hourly = forecast_response['hourly']
        let daily = forecast_response['daily']
    
        return [hourly, daily]
}

export {
    fetchLocation, fetchWeather, fetchForecast, getParsedForecast
}