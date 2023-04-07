import React from "react";
import personService from "../services/persons";

const Persons = ({ persons, searchFilter, setPersons, setNotificationMessage }) => {
    const deletePerson = (id) => {
        const person = persons.find(person => person.id === id);

        if (window.confirm(`Are you sure to delete person ${person.name}?`)) {

            personService
                .deleteById(id)
                .then(() => setPersons(persons.filter(person => person.id !== id)))
                .catch(error => {
                    setNotificationMessage({ status: "error", text: `Person "${person.name}" has already been removed from PhoneBook` });
                    setTimeout(() => { setNotificationMessage({}) }, 5000); 
                    setPersons(persons.filter(person => person.id !== id));
                    console.log(error);
                });
        }
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