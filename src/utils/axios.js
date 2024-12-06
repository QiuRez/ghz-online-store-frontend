import axios from "axios"
import { useUserStore } from "@/stores/user"
import { storeToRefs } from "pinia"

export const fetcher = () => {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  const userStore = useUserStore()
  const { isLoggedIn, token } = storeToRefs(userStore)

  if (isLoggedIn.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  const axiosInstance = axios.create()

  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error?.response?.status === 401) {
        userStore.preventLogout()
      }
      return Promise.reject(error)
    }
  )

  return { axiosInstance }
}