// API KEY for OPEN WEATHER API
import TOKEN from './config.js'

/**
 * 
 * function to show the data form open weather api of a specific city
 * @param {*} city 
 * @returns the weather data of the city
 */
export const getWeather = async (city) => {
    const BASE_URI = `https://api.openweathermap.org/data/2.5/`
    const query = `weather?q=${city}&appid=${TOKEN}&units=metric`

    const response = await fetch(`${BASE_URI}/${query}`)
    const data = await response.json()
    return data
}