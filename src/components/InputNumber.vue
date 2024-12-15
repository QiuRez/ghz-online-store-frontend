<template>
    <div 
        class="inputNumberBlock"
        :class="disabledRef && `inputNumberBlockDisable`"
    >
        <button
            @click="decrementValue"
            :disabled="disabled"
            class="inputNumberButtons border-r-[1px]"
        >
            <p class="rotate-90 font-semibold">></p>
        </button>
        <input 
            type="number"
            ref="numberInput"
            :disabled="disabledRef"
            :value="defaultValue"
            @input="({target}) => inputHandler(target.value)"
            @beforeinput="(e) => {
                if (isNaN(e.data)) {
                    e.preventDefault()
                }
            }"
            class="inputNumberInput"
        />
        <button
            @click="incrementValue"
            :disabled="disabledRef"
            class="inputNumberButtons border-l-[1px]"
        >
            <p class="rotate-90 font-semibold"><</p>
        </button>
    </div>
</template>

<script setup>
import { ref, toRef } from 'vue'

const numberInput = ref(null)

const props = defineProps({
    defaultValue: {
        type: String,
        default: 0
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const disabledRef = toRef(props, 'disabled')

const emit = defineEmits(['changeValue', 'changeValueUp', 'changeValueDown'])

const inputHandler = (value) => {
    emit('changeValue', [value])
}

const incrementValue = () => {
    if (numberInput.value) {
        numberInput.value.stepUp();
        inputHandler(numberInput.value.valueAsNumber)
        emit('changeValueUp', [numberInput.value.valueAsNumber])
    }
};

const decrementValue = () => {
    if (numberInput.value) {
        numberInput.value.stepDown();
        inputHandler(numberInput.value.valueAsNumber)
        emit('changeValueDown', [numberInput.value.valueAsNumber])
    }
};


</script>


<style scoped>
.inputNumberBlock {
    @apply relative flex flex-nowrap border-[2px] max-w-[110px] min-w-[110px] max-[1000px]:min-w-[80px] max-[1000px]:max-w-[80px] h-8 items-center justify-self-center self-center md:justify-self-start md:self-start justify-between rounded-l-xl rounded-r-xl overflow-hidden
}

.inputNumberButtons {
    @apply text-center px-3 py-1 hover:bg-black hover:bg-opacity-5 max-[1000px]:px-1
}

.inputNumberInput {
    @apply [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:outline-1 focus-visible:outline-cyan-200 w-full text-center font-semibold rounded-none
}

.inputNumberBlockDisable {
    @apply after:content-[''] after:absolute after:inset-0 after:bg-black after:bg-opacity-20 after:cursor-default
}

</style>