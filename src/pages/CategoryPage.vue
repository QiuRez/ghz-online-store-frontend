<template>
  <main class="main flex flex-col gap-5">
    <div>
      <p class="text-[30px] md:text-[40px] font-semibold text-center sm:text-left">{{ categoryRef.title }}</p>
    </div>
    <div class="flex flex-col justify-center w-full">
      <div 
        v-for="item in productsCategory"
        class="flex flex-col md:flex-row md:justify-between gap-1 p-5 rounded-[30px] bg-white shadow-lg object-cover"
      >
        <div class="flex flex-row gap-3">
          <img :src="item.images" alt="" class="w-[100px] h-[100px] md:w-[200px] md:h-[200px]">
          <a 
            href=""
            class="flex flex-col gap-2 text-pretty"
          >
            <p class="text-[14px] font-medium">{{ item.title }}</p>
            <p class="text-[13px] break-all">{{ item.description }}</p>
          </a>
        </div>
        <div class="flex flex-row md:flex-col justify-between md:justify-normal gap-3">
          <p class="bg-primary-color md:bg-transparent text-primary-color-darker font-semibold px-3 py-2 rounded-[30px] text-[14px] whitespace-nowrap">{{ item.price }} ₽</p>
          <button class="border border-black border-opacity-30 md:border-primary-color pr-1 bg-opacity-50 w-8 h-8 md:w-fit md:h-auto md:py-2 md:px-3 flex md:flex duration-300 hover:bg-primary-color items-center justify-center rounded-lg">
            <CartIcon color="#BEAAEB" class="md:hidden" />
            <p class="hidden md:block">В корзину</p>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/stores/main';
import { useCategoryStore } from '@/stores/category';
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia';
import CartIcon from '@/components/icons/CartIcon.vue';

const mainStore = useMainStore()
const cartStore = useCartStore()

const categoryStore = useCategoryStore()
const { productsCategory, categoryRef } = storeToRefs(categoryStore)

const route = useRoute()
const router = useRouter()

const categoryFound = ref(true)

watch(router.currentRoute, (page) => {
  categoryStore.fetchCategoryProducts(page.params.category)
})


onBeforeMount(() => {
  const { category } = route.params
  categoryStore.fetchCategoryProducts(category)
})


</script>