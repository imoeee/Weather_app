const API_KEY = 'f2300f8007280585fe10f7a5c77c97e0';

const makeIconURL = (iconID) => `https://openweathermap.org/img/wn/${iconID}@2x.png`

const getWeatherData = async (city, units = 'metric') => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    const { weather,
        main: { temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity },
        wind: { speed },
        sys: { country },
        name } = data;

    const { description, icon } = weather[0];

    return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    };

}

export { getWeatherData };
