import React, { useEffect, useState } from 'react'
import hotBg from './assets/hot.jpg'
import coldBg from './assets/cold.jpg'
import Description from './components/Description'
import { getWeatherData } from './weatherService'

const App = () => {
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getWeatherData(city, units)
      setWeather(data);
      //dynamic bg
      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    }
    fetchdata();
  }, [units, city])

  const handleClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  }

  const enterKey = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className='app' style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
              <div className="section section_inputs">
                <input onKeyDown={enterKey} type="text" name='city' placeholder='Enter City....' />
                <button onClick={(e) => handleClick(e)}>°F</button>
              </div>
              <div className="section section_temperature">
                <div className="icon">
                  <h3> {`${weather.name}, ${weather.country}`} </h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3> {`${weather.description}`} </h3>
                </div>
                <div className="temperature">
                  <h1> {`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`} </h1>
                </div>
              </div>


              {/* bottom description */}
              <Description weather={weather} units={units} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App
