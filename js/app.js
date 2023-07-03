import { getWeather } from "./weather"

// HTML ELEMENTS
// The for to search country
const cityForm = document.querySelector('.change-location')
// the card contianer
const card = document.querySelector('.card')
// the image in the card
const cardImg = card.querySelector('.time')
// icon image
const icon = document.querySelector('.icon').firstElementChild  
// The details container
const details = document.querySelector('.details')
// first span that will show the temperature
const temp = details.querySelector('span')
// first h5 that will show the cityName
const cityName = details.querySelector('h5')
// first div that will show the weather detail name (Eg: drizzle)
const weatherCondition = details.querySelector('div')

/**
 * function to update the UI
 * @param {data}
 */
const updateUI = ({ city, isDay, weatherIcon, temperature, condition }) => {
    icon.setAttribute('src', weatherIcon)
    temp.textContent = temperature
    cityName.textContent = city
    weatherCondition.textContent = condition
    cardImg.setAttribute('src', isDay ? './images/day.svg': './images/night.svg') 

    // remove d-none class
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}

// function to get current time of the city
const getTime = (timezone) => {
    const localTime = new Date().getTime()
    const localOffset = new Date().getTimezoneOffset() * 60000
    const currentUtcTime = localOffset + localTime
    const cityOffset = currentUtcTime + 1000 * timezone
    const cityTime = new Date(cityOffset).getHours()
    if(cityTime <= 18 && cityTime >= 6){
        return true
    }else{
        return false
    }
}

/**
 * calls the getWeather function and gets the required ones
 * @param {*} city 
 * @returns the object after getting all the data from the qpi call in another file
 */
const updateCity = async (city) => {
    // get weather data from weather.js
    const data = await getWeather(city)
    const isDay = getTime(data.timezone)

    return {
        city: data.name,
        isDay,
        weatherIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        condition: data.weather[0].main,
        temperature: Math.floor(data.main.temp)
    }
}

// event listener for the form
cityForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const city = cityForm.city.value.trim()
    cityForm.reset()

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err.message))
})