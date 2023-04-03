import React from "react";

const CountryDetails = ({ country }) => (
    <div>
        <div>
            <div><b>Capital:</b> {country.capital[0]}</div>
            <div><b>Population:</b> {country.population}</div>
        </div>
        <div>
            <Languages languages={country.languages} />
        </div>
        <div>
            <img src={country.flags.svg} width={150} height={150} alt="Country Flag" ></img>
        </div>
    </div>
);

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

export default CountryDetails