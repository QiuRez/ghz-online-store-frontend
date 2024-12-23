<template>
    <!-- TODO: Перенести логику v-for в родительский div -->
    <div v-for="item in productsRef"
        class="grid md:flex-row md:justify-between gap-1 p-5 rounded-[30px] bg-white object-cover productItemGrid"
        :class="isCart ? 'productItemGridCart' : 'shadow-lg'"
    >
        <div class="[grid-area:img] w-[100px] md:w-[200px] h-full">
            <img :src="item.images" alt="" class=" md:w-[200px] md:h-[200px] object-contain">
        </div>
        <div class="flex flex-col gap-2 text-pretty [grid-area:title] cursor-pointer hover:text-indigo-500 duration-200" @click="router.push({name: 'productItem', params: { slug: item.slug} })">
            <p class="text-[12px] md:text-[14px] font-medium">{{ item.title }}</p>
            <p v-if="!isCart" class="text-[11px] md:text-[13px] break-all max-h-[178px] overflow-hidden line-clamp-[8]">{{ item.description }}</p>
        </div>
        <InputNumber 
            :defaultValue="item.count"
            :disabled="disableInputCount"
            @changeValueUp="changeCountUp(item.id)"
            @changeValueDown="changeCountDown(item.id)"
            class="[grid-area:countInput] self-start"
            :class="isCart ? '' : '!hidden'"
        />
        <div 
            class="[grid-area:menu] flex md:justify-self-end mr-3 h-fit md:items-center p-1 hover:bg-black hover:bg-opacity-5 rounded-lg w-fit cursor-pointer justify-self-end items-start"
            v-if="isCart"
            title="Удалить из корзины"
            @click="onTrash(item.id)"
        >
            <TrashIcon :class="isCart ? '' : 'hidden'" />
        </div>
        <p
            class="flex flex-col bg-primary-color h-fit items-center md:items-stretch md:bg-transparent text-primary-color-darker font-semibold px-3 py-2 rounded-[30px] text-[12px] md:text-sm whitespace-nowrap [grid-area:price]"
            
        >
            <span v-if="item.price_discount" class="text-end">
                {{ priceWithDiscount(item) }} ₽
            </span>
            <span 
                class="text-end"
                :class="item.price_discount && 'text-[11px] line-through decoration-indigo-500/80'"
            >   
                {{ item.price }} ₽
            </span>
        </p>
        <button
            class="[grid-area:button] border border-black border-opacity-30 md:border-primary-color bg-opacity-50 w-8 h-8 md:w-fit md:h-auto md:py-2 md:px-3 duration-300 enabled:hover:bg-primary-color items-center justify-center rounded-lg"
            :class="isCart ? 'hidden' : 'flex'"
            id="auth-open-modal"
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
            <CartIcon color="#BEAAEB" v-if="!cartHasItem(item)" class="pr-1 md:hidden" />
            <CheckIcon color="#BEAAEB" v-if="cartHasItem(item)" class="self-center md:hidden" />

            <p class="hidden md:block" v-if="!cartHasItem(item)">В корзину</p>
            <p class="hidden md:block" v-else>В корзине</p>
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
import CheckIcon from '@/components/icons/CheckIcon.vue'
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
    cartStore.removeItem(id, () => {
        
        disableInputCount.value = false
    })
}

const onTrash = (id) => {
    cartStore.removeAllProduct(id)
}

const cartHasItem = (item) => {
    return !!cartProducts.value.filter((cartItem) => cartItem.id === item.id).length
}

const priceWithDiscount = (item) => {
    let priceDiscount = item.price_discount.replace(',', '')
    item.count = item.count || 1
    return Intl.NumberFormat('en').format(parseFloat(priceDiscount) * item.count) 
}

const addCart = (id) => {
    waitResponse.value = true
    cartStore.addItem(id, () => {
        waitResponse.value = false
    })
}


</script>