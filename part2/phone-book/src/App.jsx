import React, { useState } from "react";

const Person = ({ person }) => <li>{person.name}: {person.number}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0994761704" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find(person => person.name === newName);
    if (personExists) {
      return alert(`Whops,${newName} already exists!`);
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          name: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {
            persons.map(
              (person, index) => <Person key={index} person={person} />
            )
          }
        </ul>
      </div>
      <div style={{ backgroundColor: "#0fff55" }}>
        <h2>debug</h2>
        current writing = {newName} {newNumber}
      </div>
    </div>
  );
}

export default App;