import React, { useState } from "react";

const Person = ({ person }) => <li>{person.name}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
  ]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find(person => person.name === newName);
    if (personExists) {
      return alert(`Whops,${newName} already exists!`);
    }

    const personObject = {
      name: newName,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
        current writing = {newName}
      </div>
    </div>
  );
}

export default App;