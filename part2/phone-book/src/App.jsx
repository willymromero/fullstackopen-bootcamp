import Filter from "./components/filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0994761704" },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonNumber, setNewPersonNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find(person => person.name === newPersonName);
    if (personExists) {
      return alert(`Whops,${newPersonName} already exists!`);
    }

    const personObject = {
      name: newPersonName,
      number: newPersonNumber,
    };
    setPersons(persons.concat(personObject));
    setNewPersonName("");
    setNewPersonNumber("");
  }

  const handleNameChange = (event) => {
    setNewPersonName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewPersonNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addPerson}
        personName={newPersonName} handlePersonName={handleNameChange}
        personNumber={newPersonNumber} handlePersonNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchFilter={searchFilter} />
      <div style={{ backgroundColor: "#0fff55" }}>
        <h2>Debug</h2>
        current writing = {newPersonName} {newPersonNumber}
      </div>
    </div>
  );
}

export default App;