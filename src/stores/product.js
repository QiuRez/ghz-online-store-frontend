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

  const fetchAllDiscountProducts = (callback) => {
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
      .finally(() => {
        callback(true)
      })
  }

  const searchProduct = (q, callback) => {
    axios
      .get(`search/${q}`)
      .then((response) => {
        if (response.data?.data?.products) {
          callback(response.data.data.products)
        } else {
          callback(false)
        }
      })
      .catch((error) => {
        console.log(error);
        callback(false);
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
    searchProduct,
    fetchAllDiscountProducts,
    fetchOneProduct
  }
})
