import { BiSearch } from 'react-icons/bi'

const Filter = ({ handleChange }) => (
  <div className='filter-container'>
    <div className='filter'>
      <i><BiSearch /></i>
      <input
        placeholder='Filter by name'
        className='filter__input'
        onChange={handleChange}
      />
    </div>
  </div>
)

export default Filter
