<template>
  <main class="main flex flex-col gap-5">
    <div>
      <p class="text-[30px] md:text-[40px] font-semibold text-center sm:text-left">{{ categoryRef.title }}</p>
    </div>
    <div class="flex flex-col justify-center w-full gap-7">
      <div v-if="!categoryFetched" class="flex flex-col justify-center w-full gap-7">
        <Skeleton v-for="n in 2" class="!rounded-[30px] !h-[250px]" />
      </div>
      <ProductItem :products="productsCategory" />
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Skeleton from 'primevue/skeleton';
import { useMainStore } from '@/stores/main';
import { useCategoryStore } from '@/stores/category';
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia';
import ProductItem from '@/components/ProductItem.vue';

const mainStore = useMainStore()
const cartStore = useCartStore()

const categoryStore = useCategoryStore()
const { productsCategory, categoryRef, categoryFetched } = storeToRefs(categoryStore)

const route = useRoute()
const router = useRouter()

watch(router.currentRoute, (page) => {
  productsCategory.value = []
  categoryStore.fetchCategoryProducts(page.params.category)
})


onBeforeMount(() => {
  const { category } = route.params
  categoryStore.fetchCategoryProducts(category)
})


</script>