import React from 'react'
import personService from '../services/persons'
import PhoneCard from './PhoneCard'

const PhoneList = ({ persons, searchFilter, setPersons, setNotificationMessage }) => {
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Are you sure to delete person ${person.name}?`)) {
      personService
        .deleteById(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          setNotificationMessage({ status: 'error', text: `Person "${person.name}" has already been removed from PhoneBook` })
          setTimeout(() => { setNotificationMessage({}) }, 5000)
          setPersons(persons.filter(person => person.id !== id))
          console.log(error)
        })
    }
  }

  return (
    <div className='phone-list'>
      <ul>
        {persons
          .filter(
            person => person.name.match(new RegExp(`.*${searchFilter}.*`, 'i'))
          )
          .map(
            (person, index) => (
              <li key={index}>
                <PhoneCard
                  name={person.name}
                  number={person.number}
                  handleDelete={() => deletePerson(person.id)}
                />
              </li>
            )
          )}
      </ul>
    </div>
  )
}

export default PhoneList
