import React from "react";
import personService from "../services/persons";

const Persons = ({ persons, searchFilter, setPersons }) => {
    const deletePerson = (id) => {
        const person = persons.find(person => person.id === id);

        personService
            .deleteById(id)
            .then(() => setPersons(persons.filter(person => person.id !== id)))
            .catch(error => {
                alert(`The person "${person.name}" was already deleted from server 😨`);
                setPersons(persons.filter(person => person.id !== id));
                console.log(error);
            });
    };

    return (
        <div>
            <ul>
                {
                    persons
                        .filter(
                            person => person.name.match(new RegExp(`.*${searchFilter}.*`, "i"))
                        )
                        .map(
                            (person, index) => <li key={index} ><Person name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)} /></li>
                        )
                }
            </ul>
        </div>
    );
};

const Person = ({ name, number, deletePerson }) => {
    return (
        <>
            {name}: {number} <button onClick={deletePerson} >delete</button>
        </>
    );
};

export default Persons;