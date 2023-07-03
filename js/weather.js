// API KEY for OPEN WEATHER API
const API_KEY = 'cbd5a0c6f886d2616d8262d2a8497d6d'

/**
 * 
 * function to show the data form open weather api of a specific city
 * @param {*} city 
 * @returns the weather data of the city
 */
const getWeather = async (city) => {
    const BASE_URI = `https://api.openweathermap.org/data/2.5/`
    const query = `weather?q=${city}&appid=${API_KEY}&units=metric`

    const response = await fetch(`${BASE_URI}/${query}`)
    const data = await response.json()
    return data
}