import axios from 'axios'
const BASE_URL = 'http://localhost:3001/api/persons'

const getAll = async () => {
  const request = axios.get(BASE_URL)
  return request.then((response) => response.data)
}

const create = async (person) => {
  const request = await axios.post(BASE_URL, person)
  return request.then((response) => response.data)
}

const update = async (id, person) => {
  const request = axios.put(`${BASE_URL}/${id}`, person)
  return request.then((response) => response.data)
}

const deleteById = async (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request.then((response) => response.data)
}

export default { getAll, create, update, deleteById }
