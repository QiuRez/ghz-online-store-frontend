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
            <div class="w-[350px] bg-red-500 rounded-[20px] shadow-lg max-[1000px]:w-full">
                asd
            </div>
        </div>
    </main>
</template>
<script setup>
import Loader from '@/components/Loader.vue';
import ProductItem from '@/components/ProductItem.vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore()
const { cartProducts, cartCountProducts, cartLoaded } = storeToRefs(cartStore)

</script>