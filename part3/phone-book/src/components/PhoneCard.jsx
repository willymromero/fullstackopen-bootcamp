import { MdDelete } from 'react-icons/md'

function PhoneCard ({ name, number, handleDelete }) {
  return (
    <div className='phone-card'>
      <div className='phone-card__info'>
        <h3>{name}</h3>
        <p>{number}</p>
      </div>
      <div className='phone-card__actions'>
        <button onClick={handleDelete}>
          <MdDelete />
        </button>
      </div>
    </div>
  )
}

export default PhoneCard
