<template>
  <main class="main h-[80vh] w-full flex justify-center items-center">
    <Loader v-if="isRequestion" />
    <div 
      v-if="!isRequestion && statusRegisterVeryfied"
      class="flex flex-col gap-2 justify-center"
    >
      <p>Вы успешно подтвердили почту и зашли в аккаунт!</p>
      <button 
        @click="router.push({name: 'home'})"
        class="bg-primary-color-darker text-white rounded-[20px] px-4 py-2 hover:bg-primary-color hover:text-black duration-300 font-semibold"
      >
        Перейти на главную страницу
      </button>
    </div>
    <div
      v-if="!isRequestion && !statusRegisterVeryfied"
    >
      <p class="font-medium text-center">Что-то пошло не так <br>:(</p>
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router'
import Loader from "@/components/Loader.vue"

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const statusRegisterVeryfied = ref(false);
const isRequestion = ref(false)

onBeforeMount(() => {
  const { hash } = route.params
  isRequestion.value = true
  userStore.registerVerify(hash, (status) => {
    statusRegisterVeryfied.value = status
    isRequestion.value = false
  })
})


</script>