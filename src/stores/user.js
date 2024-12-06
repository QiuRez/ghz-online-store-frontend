import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const SESSION_STORAGE = 'user'

export const useUserStore = defineStore(SESSION_STORAGE, () => {

  const token = ref('TOKEN')
  const isLoggedIn = ref(true)


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
    token,
    isLoggedIn
  }
})
