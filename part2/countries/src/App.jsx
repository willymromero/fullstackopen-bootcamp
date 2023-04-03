import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import React, { useState, useEffect } from 'react'

function App() {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  }

  return (
    <div>
      <h1>World Countries</h1>
      <Filter handleChange={handleFilterChange} />
      <Countries countries={countries} searchFilter={searchFilter} />
    </div>
  )
}

export default App
