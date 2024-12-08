import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios';
import { useUserStore } from './user';
import { fetcher } from '@/utils/axios';

const STORAGE = 'cart'

export const useCartStore = defineStore(STORAGE, () => {
  
  //TODO: Сделать оффлайн корзину
  const cartProducts = ref([])
  const cartAllPrice = ref('');
  const cartCountProducts = computed(() => cartProducts.value.reduce((sum, item) => {
    return sum + parseInt(item['count'])
  }, 0))

  const userStore = useUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  const addItem = (id) => {
    cartProducts.value = {...cart.value, id}
  }

  const removeItem = (id) => {
    cartProducts.value = cart.value.filter(item => item.id !== id)
  }

  const getCart = () => {
    const { axiosInstance } = fetcher()
    
    axiosInstance
      .get('user/cart/get')
      .then((response) => {
        if (response.data.status == 'success') {
          cartProducts.value = response.data.data.products
          cartAllPrice.value = response.data.data.allPrice
        }
      })
      .catch((error) => {
        console.log(error);
      })
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
    getCart,
    addItem,
    removeItem
  }
})
