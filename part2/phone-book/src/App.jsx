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
  const [notificationMessage, setNotificationMessage] = useState({})

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
            setNotificationMessage({ status: "success", text: `Phone number of person "${personExists.name}" was updated successfully` });
            setTimeout(() => { setNotificationMessage({}) }, 5000);
          })
          .catch(error => {
            setNotificationMessage({ status: "error", text: `Person "${personExists.name}" has already been removed from PhoneBook` });
            setTimeout(() => { setNotificationMessage({}) }, 5000);
            setPersons(persons.filter(person => person.id !== id));
            console.log(error);
          });
      }
      return;
    }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons([...persons, newPerson]);
        setNotificationMessage({ status: "success", text: `Person "${newPerson.name}" was created successfully` });
        setTimeout(() => { setNotificationMessage({}) }, 5000);
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
      <Notification notificationMessage={notificationMessage} />
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
        setNotificationMessage={setNotificationMessage}
      />
      <div style={{ backgroundColor: "#87ffd3" }}>
        <h2>Debug</h2>
        current writing = {newPersonName} {newPersonNumber}
      </div>
    </div>
  );
};

export default App;