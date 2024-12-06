import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const SESSION_STORAGE = 'category'

export const useCategoryStore = defineStore(SESSION_STORAGE, () => {

  const productsCategory = ref([])
  const categoryRef = ref({})
  const categorySearching = ref(true)
  const categoryFound = ref(true)

  const fetchCategoryProducts = (category) => {
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
          categoryFound.value = false
        }
      })
      .finally(() => {
        categorySearching.value = false
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
    fetchCategoryProducts
  }
})
