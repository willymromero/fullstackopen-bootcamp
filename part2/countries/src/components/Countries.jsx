import React from "react";
import CountryDetails from "./CountryDetails";

const MAX_FILTERED_COUNTRIES = 10;

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const Country = ({ country, handleSelectCountry }) => {

    const countryName = country.name.common;

    const handleClick = (country) => {
        handleSelectCountry(country);
    };

    return (
        <>
            {countryName}: <Button handleClick={() => handleClick(country)} text={"show"} />
        </>
    );
};

const Countries = ({ countries, searchFilter, handleSelectCountry }) => {

    const countriesFiltered = countries.filter(
        country => new RegExp(`.*${searchFilter}.*`, "i")
            .test(country.name.common)
    );

    const countriesList = countriesFiltered.length;

    if (countriesList === 0) {
        return (
            <div>
                <p>No results</p>
            </div>
        );
    };

    if (countriesList === 1) {
        const country = countriesFiltered[0];
        return (
            <div>
                <CountryDetails country={country} />
            </div>
        );
    };

    if (countriesList > MAX_FILTERED_COUNTRIES) {
        return (
            <div>
                <p>Too many matches, specify another filter.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Countries List</h2>
            <ul>
                {
                    countriesFiltered.map(country => (

                        <li key={country.name.official}>
                            <Country country={country} handleSelectCountry={handleSelectCountry} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Countries;