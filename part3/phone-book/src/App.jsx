import Filter from './components/filter'
import PhoneList from './components/PhoneList'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import Section from './components/Section'

import React, { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPersonName, setNewPersonName] = useState('')
  const [newPersonNumber, setNewPersonNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({})

  useEffect(() => {
    personService
      .getAll()
      .then(loadedPersons => {
        setPersons(loadedPersons)
      })
  }, [])

  const addPerson = async (event) => {
    event.preventDefault()

    const personExists = persons.find(person => person.name === newPersonName)

    const personObject = {
      name: newPersonName,
      number: newPersonNumber
    }

    if (personExists) {
      if (window.confirm(`Do you want update phone number of ${personExists.name}`)) {
        personService
          .update(personExists.id, personObject)
          .then(editedPerson => setPersons(persons.map(person => person.id !== personExists.id ? person : editedPerson)))
          .then(() => {
            setNotificationMessage({ status: 'success', text: `Phone number of person "${personExists.name}" was updated successfully` })
            setTimeout(() => { setNotificationMessage({}) }, 5000)
          })
          .catch(error => {
            setNotificationMessage({ status: 'error', text: `Person "${personExists.name}" has already been removed from PhoneBook` })
            setTimeout(() => { setNotificationMessage({}) }, 5000)
            setPersons(persons.filter(person => person.id !== personExists.id))
            console.log(error)
          })
      }
      return
    }

    await personService
      .create(personObject)
      .then(newPerson => {
        setPersons([...persons, newPerson])
        setNotificationMessage({ status: 'success', text: `Person "${newPerson.name}" was created successfully` })
        setTimeout(() => { setNotificationMessage({}) }, 5000)
        setNewPersonName('')
        setNewPersonNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewPersonName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewPersonNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <main>
      <h1 className='main__title'>PhoneBook</h1>
      <Notification notificationMessage={notificationMessage} />
      <Filter handleChange={handleFilterChange} />

      <div className='main-content'>
        <div className='main-content__actions'>

          <Section
            name='newPhoneForm'
            title='Add a new'
          >
            <PersonForm
              handleSubmit={addPerson}
              personName={newPersonName} handlePersonName={handleNameChange}
              personNumber={newPersonNumber} handlePersonNumber={handleNumberChange}
            />
          </Section>
        </div>

        <Section
          name='phoneList'
          title='Numbers'
        >
          <PhoneList
            persons={persons}
            searchFilter={searchFilter}
            setPersons={setPersons}
            setNotificationMessage={setNotificationMessage}
          />
        </Section>
      </div>
    </main>
  )
}

export default App
