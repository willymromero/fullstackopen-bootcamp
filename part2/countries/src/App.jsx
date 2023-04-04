import axios from "axios";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import Filter from "./components/Filter";
import React, { useState, useEffect } from 'react'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
    setSelectedCountry({});
  }

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  }

  return (
    <div>
      <h1>World Countries</h1>
      <Filter handleChange={handleFilterChange} />
      <Countries
        countries={countries}
        searchFilter={searchFilter}
        handleSelectCountry={handleSelectCountry}
      />
      {
        Object.keys(selectedCountry).length !== 0 ? <CountryDetails country={selectedCountry} /> : <></>
      }
    </div>
  )
}

export default App
