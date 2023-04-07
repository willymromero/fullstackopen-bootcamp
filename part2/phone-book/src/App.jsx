import Filter from "./components/filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

import React, { useState, useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonNumber, setNewPersonNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(loadedPersons => {
        setPersons(loadedPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find(person => person.name === newPersonName);

    const personObject = {
      name: newPersonName,
      number: newPersonNumber,
    };

    if (personExists) {
      if (window.confirm(`Do you want update phone number of ${personExists.name}`)) {
        personService
          .update(personExists.id, personObject)
          .then(editedPerson => setPersons(persons.map(person => person.id !== personExists.id ? person : editedPerson)))
          .then(() => {
            setErrorMessage(`Phone number of person "${personExists.name}" was updated successfully`);
            setTimeout(() => { setErrorMessage(null) }, 5000);
          });
      }
      return;
    }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons([...persons, newPerson]);
        setErrorMessage(`Person "${newPerson.name}" was created successfully`);
        setTimeout(() => { setErrorMessage(null) }, 5000);
        setNewPersonName("");
        setNewPersonNumber("");
      });
  }

  const handleNameChange = (event) => {
    setNewPersonName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewPersonNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  return (
    <div>

      <h2>PhoneBook</h2>
      <Notification message={errorMessage} />
      <Filter handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addPerson}
        personName={newPersonName} handlePersonName={handleNameChange}
        personNumber={newPersonNumber} handlePersonNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchFilter={searchFilter}
        setPersons={setPersons}
      />
      <div style={{ backgroundColor: "#87ffd3" }}>
        <h2>Debug</h2>
        current writing = {newPersonName} {newPersonNumber}
      </div>
    </div>
  );
};

export default App;