import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios';
import { useMainStore } from '@/stores/main';

const SESSION_STORAGE = 'category'

export const useCategoryStore = defineStore(SESSION_STORAGE, () => {

  const productsCategory = ref([])
  const categoryRef = ref({})
  const categoryFetched = ref(true)

  const router = useRouter()

  const fetchCategoryProducts = (category) => {
    categoryFetched.value = false
    
    axios
      .get(`/category/products/${category}`)
      .then((response) => {
        if (response.data.status == 'success') {
          productsCategory.value = response.data.data.products
          categoryRef.value = response.data.data.category
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          useMainStore().setNotFound(true)
        }
      })
      .finally(() => {
        categoryFetched.value = true
      })
  }

  // const loadDefaultData = () => {
  //   const sessionStorageData = sessionStorage.getItem(SESSION_STORAGE) ?? [];

  //   if (! sessionStorageData.length) {
  //     fetchMainInfo()
  //   } else {
  //     mainInfo.value = JSON.parse(sessionStorageData)
  //   }
  // }

  // loadDefaultData()

  return {
    productsCategory,
    categoryRef,
    categoryFetched,
    fetchCategoryProducts
  }
})
