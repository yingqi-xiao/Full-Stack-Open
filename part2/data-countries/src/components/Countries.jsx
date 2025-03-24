import { useState } from 'react'
const Countries = ({ filteredCountries, weather }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const showCountryDetails = (country) => { 
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt='flag' width='300px' />
        {weather && (
          <div> 
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                 alt={weather.weather[0].description} 
            />
            <p>Wind {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    )
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length === 1) {
    return showCountryDetails(filteredCountries[0])
  } else {
    return filteredCountries.map(country =>
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => setSelectedCountry(country === selectedCountry ? null : country)}>
        {country === selectedCountry ? 'Hide' : 'Show'} 
        </button>
        {country === selectedCountry && showCountryDetails(country)}
      </div>
    )
  }
}

export default Countries