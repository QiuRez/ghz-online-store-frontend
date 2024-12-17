import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import HomePage from '@/pages/HomePage.vue'
import CartPage from '@/pages/CartPage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import CompanyPage from '@/pages/CompanyPage.vue'
import ProductCardPage from '@/pages/ProductCardPage.vue'
import UserAccount from '@/pages/UserAccount.vue'
import NotFound from '@/pages/NotFound.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const checkAuth = (to, from, next) => {
  const userStore = useUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  if (isLoggedIn.value) {
    next()
    return
  }

  router.push({
    name: 'home', 
    query: { needLogin: 1}
  })
}

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
      component: CartPage,
      beforeEnter: checkAuth
    },
    {
      path: '/categories/:category',
      name: 'category',
      component: CategoryPage
    },
    {
      path: '/companies/:company',
      name: 'company',
      component: CompanyPage
    },
    {
      path: '/product/:slug',
      name: 'productItem',
      component: ProductCardPage
    },
    {
      path: '/account',
      name: 'userAccount',
      component: UserAccount,
      beforeEnter: checkAuth
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
  ]
})

const DEFAULT_TITLE = 'GHZ - Интернет магазин компьютерных комплектующих'

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
})

export default router
