<template>
    <div v-for="item in productsRef"
        class="flex flex-col md:flex-row md:justify-between gap-1 p-5 rounded-[30px] bg-white object-cover"
        :class="isCart ? '' : 'shadow-lg'">
        <div class="flex flex-row gap-3">
            <img :src="item.images" alt="" class="w-[100px] h-[100px] md:w-[200px] md:h-[200px]">
            <a href="" class="flex flex-col gap-2 text-pretty h-fit">
                <p class="text-[14px] font-medium">{{ item.title }}</p>
                <p v-if="!isCart" class="text-[13px] break-all">{{ item.description }}</p>
                <div @click.prevent class="flex flex-nowrap justify-around max-w-[120px]">
                    <InputNumber 
                        :defaultValue="item.count"
                        :disabled="disableInputCount"
                        @changeValueUp="changeCountUp(item.id)"
                        @changeValueDown="changeCountDown(item.id)"
                    />
                </div>
            </a>
        </div>
        <div class="flex flex-row md:flex-col justify-between md:justify-normal gap-3">
            <TrashIcon class="cursor-pointer self-end mr-3" />
            <p
                class="bg-primary-color md:bg-transparent text-primary-color-darker font-semibold px-3 py-2 rounded-[30px] text-[14px] whitespace-nowrap"
            >
                {{ item.price }} ₽
            </p>
            <button
                class="border border-black border-opacity-30 md:border-primary-color pr-1 bg-opacity-50 w-8 h-8 md:w-fit md:h-auto md:py-2 md:px-3 duration-300 hover:bg-primary-color items-center justify-center rounded-lg"
                :class="isCart ? 'hidden' : 'flex'">
                <CartIcon color="#BEAAEB" class="md:hidden" />
                <p class="hidden md:block">В корзину</p>
            </button>
        </div>
    </div>
</template>

<script setup>
import { toRef, ref } from 'vue';
import CartIcon from '@/components/icons/CartIcon.vue';
import InputNumber from '@/components/InputNumber.vue';
import { useCartStore } from '@/stores/cart';
import TrashIcon from '@/components/icons/TrashIcon.vue'

const cartStore = useCartStore()

const disableInputCount = ref(false)

const props = defineProps({
    products: {
        type: Array,
        default: []
    },
    isCart: {
        type: Boolean,
        default: false
    }
})

const productsRef = toRef(props, 'products')

const changeCountUp = (id) => {
    disableInputCount.value = true
    cartStore.addItem(id, () => {
        disableInputCount.value = false
    })
}

const changeCountDown = (id) => {
    disableInputCount.value = true
    console.log(id);
    cartStore.removeItem(id, () => {
        
        disableInputCount.value = false
    })
}


</script>