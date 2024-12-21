import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useCartStore } from '@/stores/cart';
import axios from 'axios';

const SESSION_STORAGE = 'user'

export const useUserStore = defineStore(SESSION_STORAGE, () => {

  const user = ref({})
  const token = computed(() => user?.value?.token || false)
  const isLoggedIn = computed(() => user?.value?.token ? true : false)


  const sendEmail = (email, callback) => {
    axios
      .post('user/sendCode', {email: email})
      .then((response) => {
        if (response.data.status = 'success') {
          callback(true)
        } else {
          callback(false)
        }
      })
      .catch((error) => {
        console.log(error);
        callback(false)
      })
  }

  const auth = (email, code, callback) => {
    const data = {
      email: email,
      code: code
    }

    axios
      .post('user/auth', data)
      .then((response) => {
        if (response.data.status = 'success') {
          user.value = response.data.data.user
          user.value.token = response.data.data.token
          localStorage.setItem(SESSION_STORAGE, JSON.stringify(user.value))
          callback(true)
        }
        callback(false)
      })
      .catch((error) => {
        console.log(error);
        callback(false)
      })
  }


  const preventLogout = () => {
    user.value = {}
    localStorage.removeItem(SESSION_STORAGE)

    const cartStore = useCartStore()
	  cartStore.reset()
  }

  const loadDefaultData = () => {
    const localStorageData = localStorage.getItem(SESSION_STORAGE) ?? [];

    if (localStorageData.length) {
      user.value = JSON.parse(localStorageData)
    } 
  }

  loadDefaultData()

  return {
    user,
    token,
    isLoggedIn,
    preventLogout,
    sendEmail,
    auth
  }
})
