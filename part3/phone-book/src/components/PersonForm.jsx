const PersonForm = (props) => {
  const {
    handleSubmit,
    personName,
    handlePersonName,
    personNumber,
    handlePersonNumber
  } = props

  return (
    <form onSubmit={handleSubmit} className='person-form'>
      <div className='person-form__section'>
        <label htmlFor='name' className='person-form__label'>Name:</label>
        <input
          id='name'
          value={personName}
          onChange={handlePersonName}
          className='person-form__input'
        />
      </div>
      <div className='person-form__section'>
        <label htmlFor='number' className='person-form__label'>Number:</label>
        <input
          id='number'
          value={personNumber}
          onChange={handlePersonNumber}
          className='person-form__input'
        />
      </div>
      <div className='person-form__section'>
        <button type='submit' className='person-form__button person-form__button--submit'>Add</button>
      </div>
    </form>
  )
}

export default PersonForm
