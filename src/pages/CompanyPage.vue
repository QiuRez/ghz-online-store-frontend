<template>
  <main class="main flex flex-col gap-10 items-center">
    <div class="min-w-[200px] w-full max-w-[700px] flex justify-center">
      <Skeleton v-if="!productsFetched" class="!rounded-[20px] !h-[80px] !w-full" />
      <img class='h-[80px]' :src="companyRef.logo" :alt="companyRef.name">
    </div>
    <div class="flex flex-col justify-center w-full gap-7">
      <div v-if="!productsFetched" class="flex flex-col justify-center w-full gap-7">
        <Skeleton v-for="n in 2" class="!rounded-[30px] !h-[250px]" />
      </div>
      <ProductItem :products="productsCompany" />
      <div v-if="!productsCompany.length">
        <p>Пусто</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Skeleton from 'primevue/skeleton';
// import { useMainStore } from '@/stores/main';
import { useCompanyStore } from '@/stores/company';
// import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia';
import ProductItem from '@/components/ProductItem.vue';

const companyStore = useCompanyStore()
const { productsCompany, companyRef } = storeToRefs(companyStore)

const route = useRoute()
const router = useRouter()

const productsFetched = ref(false)

watch(router.currentRoute, (page) => {
  productsCompany.value = []
  companyRef.value = {}
  companyStore.fetchCompanyProducts(page.params.company, () => {
    productsFetched.value = true
  })
})


onBeforeMount(() => {
  const { company } = route.params
  companyRef.value = {}
  companyStore.fetchCompanyProducts(company, () => {
    productsFetched.value = true
  })
})
</script>
