import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countryBook from './services/data'
import weatherService from './services/weather'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newSearch, setNewSearch] = useState('')
  const [weather, setWeather] = useState(null)

  // Fetch the initial state of the data from the server 
  // using the axios-library and an Effect hook.
  useEffect(() => {
    console.log('effect')
    countryBook
      .getAll()
      .then(initialCountries => {
        console.log('promise fulfilled')
        setCountries(initialCountries)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(newSearch.toLowerCase())
  )

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      weatherService
        .getWeather(country.capital)
        .then(weatherData => {
          setWeather(weatherData)
        })
    }
  }, [filteredCountries])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value) // Update the state with the search input value
  }

  return (
    <div>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Countries filteredCountries={filteredCountries} weather={weather} /> 
    </div>
  )
}

export default App