<template>
  <div :class="[swiper ? swiperStyle[side] : '', circleBlock ? circleBlockStyle : '', circleBlockCss]" id="ArrowSwiper">
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" 
      :class="rotate[side]" 
      class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
    >
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M0.837191 7.53472L12.8263 0.208033L15.8231 2.03938L5.33231 8.45039L15.8231 14.8614L12.8263 16.6927L0.837191 9.36607C0.439876 9.12319 0.216676 8.79382 0.216676 8.45039C0.216676 8.10696 0.439876 7.7776 0.837191 7.53472Z"
        fill="#545454" />
    </svg>
  </div>
</template>
<script setup>
const props = defineProps({
  side: {
    type: String,
    required: true
  },
  swiper: {
    type: Boolean,
    default: false
  },
  circleBlock: {
    type: Boolean,
    default: false
  },
  circleBlockCss: {
    type: String,
    default: ''
  }
})
const rotate = {
  'left': '',
  'top': 'rotate-90',
  'right': 'rotate-180',
  'bottom': '-rotate-90'
}
const swiperStyle = {
  'left': 'left-0 absolute z-10 top-1/2 transform -translate-y-1/2 cursor-pointer',
  'right': 'right-0 absolute z-10 top-1/2 transform -translate-y-1/2 cursor-pointer',
}
const circleBlockStyle = 'absolute w-[40px] h-[40px] rounded-[50%]'
</script>