<template>
  <main class="main flex flex-col gap-7">
    <Carousel :value="bigMenuItems" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" :pt="pt">
      <template #item="slotProps">
          <div class="w-[240px] min-w-[240px] p-2 md:p-0 h-[224px] cursor-pointer">
            <div class="w-full h-full rounded-[30px] overflow-hidden py-[21px] px-[28px] relative"
            :class="slotProps.data.backgroundColor">
              <p class="text-[20px] md:text-[25px] absolute z-[2] khula-extrabold">{{ slotProps.data.title }}</p>
              <component :is='slotProps.data.svg' v-if="slotProps.data.svg" :class="slotProps.data.svgStyle"></component>
            </div>
          </div>
      </template>
    </Carousel>

    <div class="flex justify-around">
      <div class="w-[129px] h-[46px] bg-white rounded-[20px] flex items-center justify-center cursor-pointer">
        <!-- TODO: Поменять p на a>img и сделать выгрузку из бэкенда -->
        <p>LOGO</p>
      </div>
    </div>

    <div class="w-full h-[369px] bg-[#FF9E9E] rounded-[30px] overflow-hidden flex justify-between p-[20px]">
      <div class="flex flex-col flex-[3] justify-between">
        <div class="w-full flex flex-col gap items-center">
          <p class="khula-extrabold text-white text-[36px]">Скидки горят!</p>
          <p class="khula-extrabold text-white text-[24px] text-center">Успейте преобрести <br> товары со скидкой до 70%</p>
        </div>
        <div class="bg-[#F4BFBF] w-full h-[146px] rounded-[30px] hover:bg-[#f3d5d5]">
          <a href="#" class="w-full h-full flex items-center justify-center pl-10 pr-5">
            <div class="flex justify-around items-center w-full">
              <p class="font-[800] text-[28px] text-center text-[#664B4B] leading-[30px]">Показать <br> больше акций</p>
              <div class="rounded-[50%] bg-[#D88585] w-[60px] h-[60px] border-[#AD5557] border flex items-center justify-center">
                <ArrowToLeft />
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="flex-[5]">
        
      </div>
    </div>

  </main>
</template>


<script setup>
import { ref } from "vue"
import Carousel from "primevue/carousel"
import CatalogListIcon from "@/components/icons/HomePage/CatalogListIcon.vue"
import DeliveryIcon from "@/components/icons/HomePage/DeliveryIcon.vue"
import MakePCIcon from "@/components/icons/HomePage/MakePCIcon.vue"
import SalesIcon from "@/components/icons/HomePage/SalesIcon.vue"
import ArrowToLeft from "@/components/icons/HomePage/ArrowToLeft.vue"

const pt = ref({
  "item": 'flex justify-center',
  "indicatorList": "min-[1200px]:!hidden",
  "pcPrevButton": {
    "root": "min-[1200px]:!hidden"
  },
  "pcNextButton": {
    "root": "min-[1200px]:!hidden"
  },
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
    svg: SalesIcon,
    svgStyle: "w-full z-[1] absolute right-[10px] bottom-[10px]"
  },
  {
    title: 'Доставка',
    backgroundColor: 'bg-[#EFDAD3] bg-opacity-[.78]',
    svg: DeliveryIcon,
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
