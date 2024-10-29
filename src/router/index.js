import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import HomePage from '@/pages/HomePage.vue'
import CartPage from '@/pages/CartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
  ]
})

const DEFAULT_TITLE = 'GHZ - Интернет магазин компьютерных комплектующих'

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
})

export default router
