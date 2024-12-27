import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from './user';
import { fetcher } from '@/utils/axios';

const STORAGE = 'cart'

export const useCartStore = defineStore(STORAGE, () => {
  
  //TODO: Сделать оффлайн корзину
  const cartProducts = ref([])
  const cartAllPrice = ref('');
  const cartAllPriceDiscount = ref('')
  const cartPriceDiffDiscount = ref(false)
  const cartCountProducts = computed(() => cartProducts.value.reduce((sum, item) => {
    return sum + parseInt(item['count'])
  }, 0))
  const cartLoaded = ref(false);

  const userStore = useUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  const addItem = (id, callback) => {
    const data = {
      product_id: id.toString()
    }

    const { axiosInstance } = fetcher()
    axiosInstance
      .post('user/cart/add', data)
      .then((response) => {
        if (response.data.status == 'success') {
          cartProducts.value = response.data.data.products
          cartAllPrice.value = response.data.data.allPrice
          cartAllPriceDiscount.value = response.data.data.allPriceDiscount
          if (cartAllPrice.value == cartAllPriceDiscount.value) {
            cartPriceDiffDiscount.value = false
          } else {
            cartPriceDiffDiscount.value = true
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        callback(true)
      })
  }

  const removeItem = (id, callback) => {
    const data = {
      product_id: id.toString()
    }

    const { axiosInstance } = fetcher()
    axiosInstance
      .post('user/cart/remove', data)
      .then((response) => {
        if (response.data.status == 'success') {
          cartProducts.value = response.data.data.products
          cartAllPrice.value = response.data.data.allPrice
          cartAllPriceDiscount.value = response.data.data.allPriceDiscount
          if (cartAllPrice.value == cartAllPriceDiscount.value) {
            cartPriceDiffDiscount.value = false
          } else {
            cartPriceDiffDiscount.value = true
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        callback(true)
      })
  }

  const getCart = () => {
    const { axiosInstance } = fetcher()
    cartLoaded.value = true
    
    axiosInstance
      .get('user/cart/get')
      .then((response) => {
        if (response.data.status == 'success') {
          cartProducts.value = response.data.data.products
          cartAllPrice.value = response.data.data.allPrice
          cartAllPriceDiscount.value = response.data.data.allPriceDiscount
          if (cartAllPrice.value == cartAllPriceDiscount.value) {
            cartPriceDiffDiscount.value = false
          } else {
            cartPriceDiffDiscount.value = true
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        cartLoaded.value = false
      })
  }

  const removeAllProduct = (id, callback) => {
    const { axiosInstance } = fetcher()
    cartLoaded.value = true

    axiosInstance
      .post('user/cart/removeAllProduct', {product_id: id.toString()})
      .then((response) => {
        if (response.data.status == 'success') {
          cartProducts.value = response.data.data.products
          cartAllPrice.value = response.data.data.allPrice
          cartAllPriceDiscount.value = response.data.data.allPriceDiscount
          if (cartAllPrice.value == cartAllPriceDiscount.value) {
            cartPriceDiffDiscount.value = false
          } else {
            cartPriceDiffDiscount.value = true
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        cartLoaded.value = false
        callback(true)
      })
  }

  const findProduct = (product_id) => {
    return !!cartProducts.value.filter((item) => item.id == product_id).length
  }

  const reset = () => {
    cartProducts.value = []
    cartAllPrice.value = ''
  }

  //TODO: Сделать здесь подгрузку корзины

  const loadDefaultData = () => {
    if (isLoggedIn.value) {
      getCart()
    }

  }

  loadDefaultData()

  return {
    cartProducts,
    cartAllPrice,
    cartCountProducts,
    cartLoaded,
    cartAllPriceDiscount,
    cartPriceDiffDiscount,
    getCart,
    addItem,
    removeItem,
    reset,
    removeAllProduct,
    findProduct
  }
})
