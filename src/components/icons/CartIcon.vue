<template>
    <div class="relative">
        <div :id="`cartIconBlock${showCount ? '' : '1'}`" :class="cartCount && `cartCountProduct`">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_72)">
                    <path
                        d="M1.60986 0.98938H4.97082L7.22265 12.2402C7.29949 12.627 7.50994 12.9745 7.81716 13.2218C8.12438 13.4691 8.5088 13.6005 8.90313 13.593H17.0702C17.4646 13.6005 17.849 13.4691 18.1562 13.2218C18.4634 12.9745 18.6739 12.627 18.7507 12.2402L20.0951 5.19057H5.81105M9.17201 17.7941C9.17201 18.2582 8.79582 18.6344 8.33177 18.6344C7.86772 18.6344 7.49153 18.2582 7.49153 17.7941C7.49153 17.3301 7.86772 16.9539 8.33177 16.9539C8.79582 16.9539 9.17201 17.3301 9.17201 17.7941ZM18.4146 17.7941C18.4146 18.2582 18.0384 18.6344 17.5744 18.6344C17.1103 18.6344 16.7341 18.2582 16.7341 17.7941C16.7341 17.3301 17.1103 16.9539 17.5744 16.9539C18.0384 16.9539 18.4146 17.3301 18.4146 17.7941Z"
                        :stroke="props.color" stroke-opacity="0.78" stroke-width="2.01657" stroke-linecap="round"
                        stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_1_72">
                        <rect width="20.1657" height="20.1657" fill="white" transform="translate(0.769531 0.149139)" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    </div>
</template>

<script setup>
import { watch, toRef } from 'vue'

const props = defineProps({
    color: {
        type: String,
        default: '#D3D9FF'
    },
    cartCount: {
        type: Number,
        default: 0
    },
    showCount: {
        type: Boolean,
        default: false
    }
})

const cartCount = toRef(props, 'cartCount')

watch(cartCount, (x) => {
    if (parseInt(x) > 0 && props.showCount) {
        let elementOld = document.querySelector('#cartIconBlockStyle')
        if (elementOld) elementOld.remove()

        let style = document.head.appendChild(document.createElement("style"))
        style.id = 'cartIconBlockStyle'
        style.innerHTML = `#cartIconBlock:after { content: '${x}' }`
    }

    if (parseInt(x) == 0 && props.showCount) {
        let style = document.head.querySelector('#cartIconBlockStyle')
        if (style) style.remove()
    }
})



</script>