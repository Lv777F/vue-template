import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

if (import.meta.hot) {
  handleHotUpdate(router)
}
