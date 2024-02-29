import axios from 'axios'
const BASE_URL = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then((response) => response.data)
}

const create = (person) => {
  const request = axios.post(BASE_URL, person)
  return request.then((response) => response.data)
}

const update = (id, person) => {
  console.log('🚀 ~ update ~ id:', id)
  const request = axios.put(`${BASE_URL}/${id}`, person)
  return request.then((response) => response.data)
}

const deleteById = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request.then((response) => response.data)
}

export default { getAll, create, update, deleteById }
