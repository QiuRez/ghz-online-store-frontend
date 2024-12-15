<template>
    <main class="main flex flex-col gap-5">
        <div>
            <p class="text-[25px] md:text-[35px] font-semibold text-center sm:text-left">
                Корзина
                <span v-if="cartCountProducts" class="text-black text-opacity-30 text-sm">Товаров: {{ cartCountProducts
                    }} шт.</span>
            </p>
        </div>
        <Loader v-if="cartLoaded" class="self-center" />
        <div class="flex flex-row gap-5 max-[1000px]:flex-col" v-if="cartProducts.length">
            <div class="flex flex-col gap-5 w-full flex-1 bg-white rounded-[20px] shadow-lg ">
                <ProductItem :products="cartProducts" :isCart="true" />
            </div>
            <div class="w-[350px] bg-white rounded-[20px] shadow-lg max-[1000px]:w-full h-fit px-3 py-5 flex flex-col gap-5">
                <p class="text-md text-center">Сумма товаров в корзине: <br> <span class="font-bold">{{ cartAllPrice }} ₽</span></p>
                <button id="buyModalOpen" class="primary-button px-4 py-1" @click="buyModal = !buyModal">Заказать</button>
            </div>
        </div>

        <div 
            v-if="buyModal"
            class="fixed bg-black bg-opacity-20 inset-0 backdrop-blur-sm grid z-20"
        >
            <div id="buyModal" class="place-self-center bg-white p-4 rounded-2xl flex flex-col gap-4">
                <div class="flex justify-between gap-10">
                    <p class="font-bold">Оформление</p>
                    <button @click="buyModal = !buyModal"><XIcon class="w-4" /></button>
                </div>
                <div class="flex flex-col gap-2 text-center">
                    <p class="text-center">Для заказа звоните по номеру телефона</p>
                    <p class="font-semibold italic">+7 (912) 777-77-77</p>
                </div>
                
            </div>
        </div>
    </main>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Loader from '@/components/Loader.vue';
import ProductItem from '@/components/ProductItem.vue';
import XIcon from '@/components/icons/XIcon.vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore()
const { cartProducts, cartCountProducts, cartLoaded, cartAllPrice } = storeToRefs(cartStore)

const buyModal = ref(false)



const handleOutclickBuyModal = (e) => {
    if (!e.target.closest('#buyModal') &&
        !e.target.closest('#buyModalOpen')
    ) {
        buyModal.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleOutclickBuyModal)
})
onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutclickBuyModal)
})

</script>