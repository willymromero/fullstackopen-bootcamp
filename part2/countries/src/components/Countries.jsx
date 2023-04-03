import React from "react";
import CountryDetails from "./CountryDetails";

const MAX_FILTERED_COUNTRIES = 10;

const Country = ({ country }) => <li>{country.name.common}</li>;

const Countries = ({ countries, searchFilter }) => {
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
                <h2>{country.name.common}</h2>
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
                {countriesFiltered.map((country, index) => <Country key={index} country={country} />)}
            </ul>
        </div>
    );
};

export default Countries;