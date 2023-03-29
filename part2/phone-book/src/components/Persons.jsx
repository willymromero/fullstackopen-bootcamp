import React from "react"

const Person = ({ person }) => <li>{person.name}: {person.number}</li>

const Persons = ({ persons, searchFilter }) => (
    <div>
        <ul>
            {
                persons
                    .filter(person => new RegExp(`.*${searchFilter}.*`, "i").test(person.name))
                    .map((person, index) => <Person key={index} person={person} />)
            }
        </ul>
    </div>
)

export default Persons;