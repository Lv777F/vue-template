axios.defaults.adapter = 'fetch'

axios.defaults.baseURL = '/api'

export const updateAuthorization = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

updateAuthorization(localStorage.getItem('token'))

window.addEventListener('storage', (event) => {
  if (event.key === 'token') {
    updateAuthorization(event.newValue)
  }
})
