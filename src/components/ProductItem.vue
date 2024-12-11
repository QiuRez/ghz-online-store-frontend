<template>
    <div v-for="item in productsRef"
        class="grid md:flex-row md:justify-between gap-1 p-5 rounded-[30px] bg-white object-cover productItemGrid"
        :class="isCart ? 'productItemGridCart' : 'shadow-lg'"
    >
        <img :src="item.images" alt="" class="w-[100px] h-[100px] md:w-[200px] md:h-[200px] [grid-area:img]">
        <a href="" class="flex flex-col gap-2 text-pretty h-fit [grid-area:title]">
            <p class="text-[14px] font-medium">{{ item.title }}</p>
            <p v-if="!isCart" class="text-[13px] break-all">{{ item.description }}</p>
        </a>
        <InputNumber 
            :defaultValue="item.count"
            :disabled="disableInputCount"
            @changeValueUp="changeCountUp(item.id)"
            @changeValueDown="changeCountDown(item.id)"
            class="[grid-area:countInput]"
            :class="isCart ? '' : 'hidden'"
        />
        <div class="[grid-area:menu]">
            <TrashIcon class="cursor-pointer self-end mr-3" :class="isCart ? '' : 'hidden'" />

        </div>
        <p
            class="bg-primary-color md:bg-transparent text-primary-color-darker font-semibold px-3 py-2 rounded-[30px] text-[14px] whitespace-nowrap [grid-area:price]"
        >
            {{ item.price }} ₽
        </p>
        <button
            class="[grid-area:button] border border-black border-opacity-30 md:border-primary-color pr-1 bg-opacity-50 w-8 h-8 md:w-fit md:h-auto md:py-2 md:px-3 duration-300 enabled:hover:bg-primary-color items-center justify-center rounded-lg"
            :class="isCart ? 'hidden' : 'flex'"
            @click="() => {
                if (isLoggedIn) {
                    if (cartHasItem(item)) {
                        router.push({name: 'cart'})
                    } else {
                        addCart(item.id)
                    }
                } else {
                    mainStore.setAuthModal(true)
                }
            }"
            :disabled="waitResponse"
        >
            <CartIcon color="#BEAAEB" class="md:hidden" />
            <p class="hidden md:block" v-if="!cartHasItem(item)">В корзину</p>
            <p class="hidden md:block" v-if="cartHasItem(item)">В корзине</p>
        </button>
    </div>
</template>

<script setup>
import { toRef, ref } from 'vue';
import CartIcon from '@/components/icons/CartIcon.vue';
import InputNumber from '@/components/InputNumber.vue';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { useMainStore } from '@/stores/main';
import TrashIcon from '@/components/icons/TrashIcon.vue'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const userStore = useUserStore()
const mainStore = useMainStore()
const { isLoggedIn } = storeToRefs(userStore)
const { cartProducts } = storeToRefs(cartStore)

const router = useRouter()

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

const waitResponse = ref(false)

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

const cartHasItem = (item) => {
    return !!cartProducts.value.filter((cartItem) => cartItem.id === item.id).length
}

const addCart = (id) => {
    waitResponse.value = true
    cartStore.addItem(id, () => {
        waitResponse.value = false
    })
}


</script>