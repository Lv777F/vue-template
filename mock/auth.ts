import { MockMethod, MockConfig } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login',
    method: 'post',
    response: () => ({
      token: 'xxx123456'
    })
  }
] as MockMethod[]
