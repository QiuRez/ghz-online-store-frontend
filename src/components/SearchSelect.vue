<template>
  <div class="absolute w-full top-[46px] bg-primary-color flex flex-col gap-2 z-10 py-2 rounded-[0_0_.5rem_.5rem]">
    <div 
      v-for="item of items"
      @click="onClick(item)"
      class="text-black hover:bg-primary-color-darker hover:text-white px-3 py-1 duration-150 cursor-pointer"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  items: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['onSelect'])

const onClick = (item) => {
  router.push({name: 'productItem', params: { slug: item.slug }})
  emit('onSelect');
}
</script>