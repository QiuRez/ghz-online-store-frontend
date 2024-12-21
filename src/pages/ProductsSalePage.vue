<template>
  <main class="main flex flex-col gap-5">
    <div>
      <p class="text-[30px] md:text-[40px] font-semibold text-center sm:text-left">Товары со скидкой</p>
    </div>
    <div class="flex flex-col justify-center w-full gap-7">
      <div v-if="!productFetched" class="flex flex-col justify-center w-full gap-7">
        <Skeleton v-for="n in 2" class="!rounded-[30px] !h-[250px]" />
      </div>
      <ProductItem :products="discountProducts" />
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import Skeleton from 'primevue/skeleton';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import ProductItem from '@/components/ProductItem.vue';

const productStore = useProductStore()
const { discountProducts } = storeToRefs(productStore)

const productFetched = ref(false)

onBeforeMount(() => {
  productStore.fetchAllDiscountProducts((status) => {
    productFetched.value = true
  })
})


</script>