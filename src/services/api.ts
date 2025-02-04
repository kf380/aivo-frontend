import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
})

export function setAuthToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete apiClient.defaults.headers.common['Authorization']
  }
}

export async function processText(payload: { text: string; oldData?: any }) {
  const response = await apiClient.post('api/process', payload)
  return response.data
}

export async function fetchRequests() {
  const response = await apiClient.get('/requests')
  return response.data
}

export default apiClient
