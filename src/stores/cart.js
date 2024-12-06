import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios';
import { useUserStore } from './user';

const STORAGE = 'cart'

export const useCartStore = defineStore(STORAGE, () => {
  
  //TODO: Сделать оффлайн корзину
  const cart = ref([])

  const userStore = useUserStore()
  const { isLoggedIn } = storeToRefs(userStore)


  const addItem = (id) => {
    cartOffline.value = {...cart.value, id}
  }

  const removeItem = (id) => {
    cart.value = cart.value.filter(item => item.id !== id)
  }

  // const loadDefaultData = () => {
  //   const storageData = localStorage.getItem(STORAGE) ?? [];

  //   if (! storageData.length) {
  //     localStorage.setItem(STORAGE, JSON.stringify([]))
  //     // fetchMainInfo()
  //   } else {
  //     cart.value = JSON.parse(storageData)
  //   }
  // }

  // loadDefaultData()

  return {
    cart,
    addItem,
    removeItem
  }
})
