import React, { useState } from "react";

const Person = ({ person }) => <li>{person.name}: {person.number}</li>

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
      <div>
        filter shown with: <input onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPersonName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPersonNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {
            persons
              .filter(person => new RegExp(`.*${searchFilter}.*`, "i").test(person.name))
              .map((person, index) => <Person key={index} person={person} />)
          }
        </ul>
      </div>
      <div style={{ backgroundColor: "#0fff55" }}>
        <h2>debug</h2>
        current writing = {newPersonName} {newPersonNumber}
      </div>
    </div>
  );
}

export default App;