<template>
  <main class="main flex flex-col gap-7">

    <div class="relative w-full blockHoverArrow">
      <div class="flex justify-between gap-10 slider-custom-container" id="scrollerBigMenu">
        <div v-for="(item, index) in bigMenuItems" class="w-[240px] min-w-[240px] p-2 md:p-0 h-[224px] cursor-pointer snap-start snap-always">
          <div 
            @click="bigMenuItemsEvent[index]"
            :id="item.id"
            class="w-full h-full rounded-[30px] overflow-hidden py-[21px] px-[28px] relative"
            :class="item.backgroundColor"
          >
            <p class="text-[20px] md:text-[25px] absolute z-[2] khula-extrabold">{{ item.title }}</p>
            <component :is='item.svg' v-if="item.svg" :class="item.svgStyle"></component>
          </div>
        </div>
      </div>

      <ArrowSlider 
        side="left"  
        :swiper="true" 
        :circleBlock="true" 
        circleBlockCss="bg-gray-500 bg-opacity-[.3] hover:bg-opacity-[.5]" 
        class="!-left-3 hidden"
        @click="scrollToPrevBigMenuItem"
      />
      <ArrowSlider 
        side="right" 
        :swiper="true" 
        :circleBlock="true" 
        circleBlockCss="bg-gray-500 bg-opacity-[.3] hover:bg-opacity-[.5]" 
        class="!-right-3 hidden"
        @click="scrollToNextBigMenuItem"
      />

    </div>
    
    <div class="relative blockHoverArrow">
      <div class="flex gap-3 justify-between slider-custom-container" id="scrollerCompanyItem">
        <div v-if="mainInfo.companies.length == 0" class="flex gap-3 justify-between w-full">
          <Skeleton
            v-for="n in 8"
            class="!min-w-[140px] !max-w-[140px] !h-[46px] !rounded-[20px]" 
          />
        </div>
        <div
          v-for="item in mainInfo.companies"
          @click=""
          class="company-item"
        >
          <img :src="item.logo" alt="" class="h-full">
        </div>
      </div>
      
      <ArrowSlider 
        side="left"  
        :swiper="true" 
        :circleBlock="true" 
        circleBlockCss="bg-gray-500 bg-opacity-[.3] hover:bg-opacity-[.5]" 
        class="!-left-3 hidden"
        @click="scrollToPrevCompanyItem"
      />
      <ArrowSlider 
        side="right" 
        :swiper="true" 
        :circleBlock="true" 
        circleBlockCss="bg-gray-500 bg-opacity-[.3] hover:bg-opacity-[.5]" 
        class="!-right-3 hidden"
        @click="scrollToNextCompanyItem"
      />
    </div>

    <div class="flex bg-[#FF9E9E] max-[1185px]:justify-center max-[1185px]:items-center max-[1185px]:flex-col-reverse rounded-[30px] gap-3 overflow-hidden justify-between px-6 py-5">


      <div class="w-[33%] max-[1185px]:w-[100%] flex flex-col max-[1185px]:flex-row max-[675px]:flex-col items-center justify-around text-center">

        <div class="w-full flex flex-col gap items-center">
          <p class="khula-extrabold text-white text-[36px]">Скидки горят!</p>
          <p class="khula-extrabold text-white text-[24px] text-center">Успейте преобрести <br> товары со скидкой до 70%</p>
        </div>
        <div class="bg-[#F4BFBF] h-[146px] rounded-[30px] w-[80%] hover:bg-[#f3d5d5]">
          <a href="#" class="w-full h-full flex items-center justify-center pl-10 pr-5">
            <div class="flex justify-around items-center w-full">
              <p class="font-[800] text-[23px] text-center text-[#664B4B] leading-[30px]">Показать <br> больше акций</p>
              <div class="rounded-[50%] bg-[#D88585] w-[40px] h-[40px] border-[#AD5557] border flex items-center justify-center">
                <ArrowToLeft class="w-[15px]" />
              </div>
            </div>
          </a>
        </div>
        
      </div>
 

        <div class="relative w-[65%] max-[1185px]:w-[100%]">
          <ArrowSlider 
            side="left"  
            :swiper="true" 
            :circleBlock="true" 
            circleBlockCss="bg-primary-color bg-opacity-[.7]" 
            class="ArrowSliderLeft_0 !-left-[20px]"
          />
          <ArrowSlider 
            side="right" 
            :swiper="true" 
            :circleBlock="true" 
            circleBlockCss="bg-primary-color bg-opacity-[.7]" 
            class="ArrowSliderRight_0 !-right-[20px]" 
          />

          
          <swiper-container init="false" id="swiper_sales_items">
            <swiper-slide v-for="n in 3" v-if="!discountProducts.length">
              <Skeleton
                class="!min-w-[236px] !max-w-[236px] !h-[320px] !rounded-[20px]" 
              />
            </swiper-slide>
            <swiper-slide v-for="item in discountProducts" class="">
              <div class="product-sale-item">
                <div class="h-[223px] bg-white flex items-center justify-center">
                  <img :src="item.images" class="object-cover" alt="">
                </div>
                <div class="flex flex-col gap-1 justify-between">
                  <div class="w-[75px] bg-white rounded-[45px] p-1 flex gap-1 whitespace-nowrap items-center">
                    <SaleIcon class="min-w-[19px] w-[19px] h-[19px]"/>
                    <p class="text-[#9EA7E0] font-extrabold">-{{ item.discount[0].amount }}%</p>
                  </div>
                  <div class="flex justify-between items-end text-white">
                    <p class="font-extrabold text-[17px] leading-[26px]">{{ item.price_discount	 }} ₽</p>
                    <p class="font-extrabold text-[11px] line-through leading-[19px]">{{ item.price }} ₽</p>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper-container>
        </div>
    </div>

    <div class="py-5 rounded-lg flex flex-col gap-5">
      <ProductItem :products="products" />
    </div>

  </main>
</template>


<script setup>
import { ref, onMounted, onBeforeMount } from "vue"
import CatalogListIcon from "@/components/icons/HomePage/CatalogListIcon.vue"
import DeliveryIcon from "@/components/icons/HomePage/DeliveryIcon.vue"
// import MakePCIcon from "@/components/icons/HomePage/MakePCIcon.vue"
import SalesIcon from "@/components/icons/HomePage/SalesIcon.vue"
import ArrowToLeft from "@/components/icons/HomePage/ArrowToLeft.vue"
import ArrowSlider from "@/components/icons/ArrowSlider.vue"
import SaleIcon from "@/components/icons/SaleIcon.vue"
import { register } from 'swiper/element/bundle'
import Skeleton from 'primevue/skeleton';
import 'swiper/css/bundle';
import { useMainStore } from "@/stores/main"
import { storeToRefs } from "pinia"
import ProductItem from "@/components/ProductItem.vue"
import { useProductStore } from '@/stores/product'

const mainStore = useMainStore()
const productStore = useProductStore()

const { headerOptions, mainInfo } = storeToRefs(mainStore)
const { products, discountProducts } = storeToRefs(productStore)

const scrollToNextBigMenuItem = () => {
  scrollerBigMenu.scrollBy({left: 240, top: 0, behavior: 'smooth'})
}
const scrollToPrevBigMenuItem = () => {
  scrollerBigMenu.scrollBy({left: -240, top: 0, behavior: 'smooth'})
}

const scrollToNextCompanyItem = () => {
  scrollerCompanyItem.scrollBy({left: 129, top: 0, behavior: 'smooth'})
}
const scrollToPrevCompanyItem = () => {
  scrollerCompanyItem.scrollBy({left: -129, top: 0, behavior: 'smooth'})
}

register()

onMounted(() => {
  
  // Swiper 
  const swiperEl = document.querySelector('#swiper_sales_items');

  const swiperParams = {
    slidesPerView: 1,
    navigation: {
      prevEl: '.ArrowSliderLeft_0',
      nextEl: '.ArrowSliderRight_0',
    },
    spaceBetween: 35,
    breakpoints: {
      1185: {
        slidesPerView: 3,
        spaceBetween: 35,
      },
      1147: {
        slidesPerView: 4,
        spaceBetween: 60,
      },
      1061: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      877: {
        slidesPerView: 3,
        spaceBetween: 70,
      },
      789: {
        slidesPerView: 2,
        spaceBetween: 180,
      },
      750: {
        slidesPerView: 2,
        spaceBetween: 150,
      },
      700: {
        slidesPerView: 2,
        spaceBetween: 100,
      },
      647: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false
      },
      557: {
        slidesPerView: 1,
        spaceBetween: 100,
        centeredSlides: true
      },

    }
  }
  Object.assign(swiperEl, swiperParams)

  swiperEl.initialize();
// Swiper end
})


const bigMenuItemsEvent = [
  function () { mainStore.setCatalogShow(!headerOptions.value.catalogShow) },
]


const bigMenuItems = ref([
  {
    title: 'Каталог',
    backgroundColor: 'bg-[#D6E6EE] bg-opacity-[.78]',
    svg: CatalogListIcon,
    svgStyle: "w-[120px] md:w-[148px] absolute right-[10px] bottom-[10px]",
    id: 'bigItemCatalog'
  },
  // TODO: До дипломной работы
  // {
  //   title: 'Собрать ПК',
  //   backgroundColor: 'bg-[#C7EDDB] bg-opacity-[.60]',
  //   svg: MakePCIcon,
  //   svgStyle: "w-full z-[1] absolute right-[10px] bottom-[10px]",
  //   id: ''
  // },
  {
    title: 'Акции',
    backgroundColor: 'bg-[#FFFEDD] bg-opacity-[.91]',
    svg: SalesIcon,
    svgStyle: "w-full z-[1] absolute right-[10px] bottom-[10px]",
    id: ''
  },
  {
    title: 'Доставка',
    backgroundColor: 'bg-[#EFDAD3] bg-opacity-[.78]',
    svg: DeliveryIcon,
    svgStyle: "w-[172px] h-auto absolute right-[10px] bottom-[10px]",
    id: ''
  },
])

const saleItems = ref([
  {
    salePercent: 35,
    price: '39999',
    oldPrice: '49990'
  },
  {
    salePercent: 32,
    price: '39900',
    oldPrice: '49990'
  },
  {
    salePercent: 40,
    price: '39900',
    oldPrice: '49990'
  },
  {
    salePercent: 32,
    price: '39900',
    oldPrice: '49990'
  },
  {
    salePercent: 32,
    price: '39900',
    oldPrice: '49990'
  },
  {
    salePercent: 32,
    price: '39900',
    oldPrice: '49990'
  },
])


onBeforeMount(() => {
  productStore.fetchAllProducts()
  productStore.fetchAllDiscountProducts()
})
</script>
