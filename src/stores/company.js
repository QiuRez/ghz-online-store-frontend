import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main';

import axios from 'axios';

const SESSION_STORAGE = 'company'

export const useCompanyStore = defineStore(SESSION_STORAGE, () => {

  const productsCompany = ref([])
  const companyRef = ref({})

  const fetchCompanyProducts = (company, callback) => {
    axios
      .get(`/company/products/${company}`)
      .then((response) => {
        if (response.data.status == 'success') {
          productsCompany.value = response.data.data.products
          companyRef.value = response.data.data.company
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          // useMainStore().setNotFound(true)
        }
      })
      .finally(() => {
        callback(true)
      })
  }

  return {
    productsCompany,
    companyRef,
    fetchCompanyProducts
  }
})
