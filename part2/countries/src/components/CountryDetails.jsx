import React, { useEffect, useState } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
    const countryName = country.name.common;
    const countryCapital = country.capital[0];
    const countryPopulation = country.population;
    const countryLanguages = country.languages;
    const countryFlagSVG = country.flags.svg;

    return (
        <div>
            <h2>{countryName}</h2>
            <div>
                <div><b>Capital:</b> {countryCapital}</div>
                <div><b>Population:</b> {countryPopulation}</div>
            </div>
            <div>
                <Languages languages={countryLanguages} />
            </div>
            <div>
                <img src={countryFlagSVG} width={150} height={150} alt="Country Flag" ></img>
            </div>
            <div>
                <Weather capital={countryCapital} />
            </div>
        </div>
    );
};

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState({});
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`;

    useEffect(() => {
        const weatherUrlAPI = apiURL;
        axios
            .get(weatherUrlAPI)
            .then(response => {
                setWeather(response.data);
            })
    }, []);

    if (!weather.current) {
        return null;
    };

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div>
                <p><b>Temperature °C: </b>{weather.current.temp_c}</p>
                <p><b>Temperature °F: </b>{weather.current.temp_f}</p>
                <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                <p><b>Wind: </b>{weather.current.wind_kph} <b>kph</b> direction {weather.current.wind_dir}</p>
            </div>
        </div>
    );
};

const Languages = ({ languages }) => {
    const languagesEntries = Object.entries(languages);

    return (
        <>
            <h3>Languages</h3>
            <ul>
                {languagesEntries.map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
        </>
    );
};

export default CountryDetails;