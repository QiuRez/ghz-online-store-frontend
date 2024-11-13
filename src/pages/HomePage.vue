<template>
  <main class="main">
    <Carousel :value="bigMenuItems" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" :pt="pt">
      <template #item="slotProps">
          <div class="w-[240px] min-w-[240px] p-2 md:p-0 h-[224px]">
            <div class="w-full h-full rounded-[30px] overflow-hidden py-[21px] px-[28px] relative"
            :class="slotProps.data.backgroundColor">
              <p class="text-[20px] md:text-[25px] absolute z-[2] khula-extrabold">{{ slotProps.data.title }}</p>
              <component :is='slotProps.data.svg' v-if="slotProps.data.svg" :class="slotProps.data.svgStyle"></component>
            </div>
          </div>
      </template>
    </Carousel>

  </main>
</template>


<script setup>
import { ref } from "vue"
import Carousel from "primevue/carousel"
import CatalogListIcon from "@/components/icons/CatalogListIcon.vue"
import DeliveryHomePageIcon from "@/components/icons/DeliveryHomePageIcon.vue"
import MakePCIcon from "@/components/icons/MakePCIcon.vue"
import SalesHomePageIcon from "@/components/icons/SalesHomePageIcon.vue"

const pt = ref({
  "item": 'flex justify-center'
})

const bigMenuItems = ref([
  {
    title: 'Каталог',
    backgroundColor: 'bg-[#D6E6EE] bg-opacity-[.78]',
    svg: CatalogListIcon,
    svgStyle: "w-[120px] md:w-[148px] absolute right-[10px] bottom-[10px]"
  },
  {
    title: 'Собрать ПК',
    backgroundColor: 'bg-[#C7EDDB] bg-opacity-[.60]',
    svg: MakePCIcon,
    svgStyle: "w-full z-[1] absolute right-[10px] bottom-[10px]"
  },
  {
    title: 'Акции',
    backgroundColor: 'bg-[#FFFEDD] bg-opacity-[.91]',
    svg: SalesHomePageIcon,
    svgStyle: "w-full z-[1] absolute right-[10px] bottom-[10px]"
  },
  {
    title: 'Доставка',
    backgroundColor: 'bg-[#EFDAD3] bg-opacity-[.78]',
    svg: DeliveryHomePageIcon,
    svgStyle: "w-[172px] h-auto absolute right-[10px] bottom-[10px]"
  },
])

const responsiveOptions = ref([
  {
    breakpoint: '1200px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '907px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '691px',
    numVisible: 1,
    numScroll: 1
  },
])

</script>
