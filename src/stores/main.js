import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const SESSION_STORAGE = 'main_info'

export const useMainStore = defineStore('main', () => {
  const mainInfo = ref({
    categories: [],
    companies: [],
    city: 'Тюмень'
  });

  const notFound = ref(false)

  const headerOptions = ref({
    catalogShow: false,
    authModal: false,
    selectCityModal: false
  })

  const setNotFound = (data) => {
    notFound.value = data
  }

  const updateHeaderOptions = (data) => {
    headerOptions.value = {...headerOptions.value, ...data}
  }

  const setCatalogShow = (data) => {
    headerOptions.value.catalogShow = data
  }

  const setAuthModal = (data) => {
    headerOptions.value.authModal = data
  }

  const updateMainInfo = (data) => {
    mainInfo.value = {...mainInfo.value, ...data}
    sessionStorage.setItem(SESSION_STORAGE, JSON.stringify(mainInfo.value))
  }

  const fetchMainInfo = async () => {
    await axios
      .get('main/info')
      .then((response) => {
        if (response.data.status == 'success') {
          sessionStorage.setItem(SESSION_STORAGE, JSON.stringify({...mainInfo.value, ...response.data.data}))
        }
      })
      .catch((error) => {
        console.log(error);
      })

    mainInfo.value = JSON.parse(sessionStorage.getItem(SESSION_STORAGE))
  }

  const loadDefaultData = () => {
    const sessionStorageData = sessionStorage.getItem(SESSION_STORAGE) ?? [];

    if (! sessionStorageData.length) {
      fetchMainInfo()
    } else {
      mainInfo.value = JSON.parse(sessionStorageData)
    }
  }

  loadDefaultData()

  return {
    mainInfo,
    headerOptions,
    notFound,
    updateMainInfo,
    setNotFound,
    updateHeaderOptions,
    setCatalogShow,
    setAuthModal
  }
})
