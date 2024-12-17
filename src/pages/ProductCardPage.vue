<template>
  <main class="main">
    <div class="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 bg-white rounded-2xl px-3 py-5" v-if="product.id">
      <div class="max-w-[300px] lg:min-w-[470px] overflow-hidden rounded-lg">
        <img :src="product.images" class="object-cover w-full" alt="">
      </div>
      <div class="flex flex-col gap-4 w-full min-h-full">
        <div class="flex justify-between gap-4">
          <p class="font-semibold text-xl">{{ product.title }}</p>
          <div class="self-start my-3 cursor-pointer max-h-5 max-w-28 hidden lg:block">
            <img :src="product.company.logo" alt="">
          </div>
        </div>
        <div class="flex justify-between w-full gap-3">
          <div class="bg-primary-color p-2 rounded-2xl w-full flex gap-4 items-end">
            <p class="text-primary-color-darker font-semibold self-center" v-if="product.price_discount">
              {{ product.price_discount }} ₽
            </p>
            <p 
              class="text-primary-color-darker font-semibold"
              :class="product.price_discount ? 'line-through text-sm leading-8' : 'self-center'"
              >
              {{ product.price }} ₽
            </p>
          </div>


          <button 
            v-if="!cartStore.findProduct(product.id)" 
            class="px-3 py-1 lg:px-6 lg:py-3 primary-button"
            id="auth-open-modal"
            @click="isLoggedIn ? cartStore.addItem(product.id, () => {}) : mainStore.setAuthModal(true)"
          >
            Купить
          </button>
          <button class="px-3 py-1 lg:px-6 lg:py-3 primary-button text-nowrap" v-else @click="router.push({name: 'cart'})">В корзине</button>
        </div>
        
        <div class="self-start my-3 cursor-pointer max-h-5 max-w-28 min-h-5 min-w-28 lg:hidden">
          <img :src="product.company.logo" alt="">
        </div>

        <hr class="w-full">

        <div>
          <p> {{ product.description }}</p>
        </div>
      </div>

      </div>
    <div v-else class="flex items-center justify-center">
      <Loader />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { useMainStore } from '@/stores/main';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Loader from '@/components/Loader.vue';

const productStore = useProductStore()
const cartStore = useCartStore()
const userStore = useUserStore()
const mainStore = useMainStore()

const { isLoggedIn } = storeToRefs(userStore)

const route = useRoute()
const router = useRouter()

const product = ref({})

const productNotFound = () => {
  mainStore.setNotFound(true)
}

watch(router.currentRoute, (page) => {
  product.value = {}
  productStore.fetchOneProduct(slug, (item) => {
    if (item) product.value = item
    else productNotFound()
  })
})

onMounted(() => {
  const { slug } = route.params
  productStore.fetchOneProduct(slug, (item) => {
    if (item) product.value = item
    else productNotFound()
  })
})
</script>