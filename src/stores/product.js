import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const SESSION_STORAGE = 'products'

export const useProductStore = defineStore(SESSION_STORAGE, () => {

  const products = ref([])
  const discountProducts = ref([])

  const fetchAllProducts = () => {
    axios
      .get('products/all')
      .then((response) => {
        if (response.data.status == 'success') {
          products.value = response.data.data
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchAllDiscountProducts = () => {
    axios
      .get('products/discount/all')
      .then((response) => {
        if (response.data.status == 'success') {
          discountProducts.value = response.data.data
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const fetchOneProduct = (slug, callback) => {
    axios
      .get(`products/first/${slug}`)
      .then((response) => {
        if (response.data.status == 'success') {
          callback(response.data.data)
        } else {
          callback(false)
        }
      })
      .catch((error) => {
        callback(false)
      })
  }

  return {
    products,
    discountProducts,
    fetchAllProducts,
    fetchAllDiscountProducts,
    fetchOneProduct
  }
})
