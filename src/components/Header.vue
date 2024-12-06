<template>
	<div class="header">
		<nav class="flex gap-4 flex-col md:flex-row justify-between md:items-center max-w-[1280px] m-auto h-full relative">
			<div class="flex justify-between md:items-center md:gap-5">
				<CompanyLogoIcon class="w-auto h-8"/>
				<div class="px-5 h-8 primary-button">
					<p>Тюмень</p>
					<!-- TODO: Сделать детект города + выбор города через поп ап -->
				</div>
			</div>
			<div 
			 	@click="mainStore.setCatalogShow(!headerOptions.catalogShow)"
				id="katalogMain"
				class="primary-button px-4 py-3 !hidden md:!flex !rounded-[7px] gap-3 cursor-pointer"
			>
				<p class="text-[15px] opacity-60">Каталог</p>
				<ArrowDownIcon class="w-4 transition-transform duration-200" :class="headerOptions.catalogShow ? 'rotate-180' : ''"/>
			</div>
				<!-- TODO: Сделать рабочий поиск -->
				<form action="" method="GET" class="search-phone-form">
					<input type="text" name="s" class="search-phone-input" placeholder="Поиск по сайту">
					<button class="search-phone-button"><SearchIcon /></button>
				</form>

				<div class="md:flex gap-2 hidden ">

					<!-- TODO: Добавить функционал на дипломную -->
					<!-- <div class="header_action_button">
						<HeartIcon />
						<p class="opacity-[0.67]">Избранное</p>
					</div> -->

					<div class="header_action_button">
						<CartIcon />
						<p class="opacity-[0.67]">Цена</p>
					</div>

					<div 
						id="auth-open-modal"
						@click="isLoggedIn ? router.push({name: 'userAccount'}) : mainStore.setAuthModal(true)"
						class="header_action_button"
					>
						<ProfileIcon />
						<p class="opacity-[0.67]" v-if="!isLoggedIn">Войти</p>
						<p class="opacity-[0.67]" v-else>Профиль</p>
					</div>

				</div>

			<!-- Каталог -->
			<div 
				v-if="headerOptions.catalogShow"
				id="katalog"
				class="absolute py-2 px-4 bg-white flex flex-col  smm:grid smm:grid-cols-2 md:flex md:flex-wrap md:flex-row items-stretch gap-[20px_20px] top-[119px] left-0 right-0 md:top-[73px] md:left-[100px] shadow-lg z-20 rounded-xl md:max-w-[80%]"
			>
				<div
					v-for="item in mainInfo.categories" 
					@click="router.push({name: 'category', params: {category: item.slug}})"
					class="cursor-pointer hover:underline flex flex-nowrap items-center gap-2"
				>
					<img :src="item.image" class="max-w-[23px]" alt="">
					<p>{{ item.title }}</p>
				</div>
			</div>
			<!-- Конец каталога -->

			<!-- Авторизация/Регистрация -->
			<div 
				:class="headerOptions.authModal ? 'flex' : 'hidden'"
				class="fixed inset-0 bg-black bg-opacity-40 z-30 items-center justify-center"
			>
				<div 
					id="authModal" 
					class="w-[400px] relative flex flex-row flex-nowrap overflow-hidden gap-[20px] items-center"
					
				>
					<div
						v-if="loaderAuth"
						class="absolute z-20 inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-[29px]"
						:class="stepAuth === 2 && 'h-[256px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'"
					>
						<Loader  />
					</div>
					<!-- Форма ввода почты -->
					<div 
						class="flex flex-col gap-[22px] w-[400px] min-w-[400px] transform duration-300 bg-white rounded-[29px] py-[22px]"
						:class="stepAuth === 2 && '-translate-x-[420px]'"
					>
						<div class="flex justify-between items-center px-[16px]">
							<p class="text-[22px] leading-6">Войти <br> или зарегистрироваться</p>
							<XIcon class="cursor-pointer w-6" @click="mainStore.setAuthModal(false)"/>
						</div>
						<hr class="border-black" />
						<form action="" @submit.prevent="onSendEmail" class="flex flex-col px-[34px] gap-[18px]">
							<input 
								type="email" 
								name="email" 
								v-model="email" 
								placeholder="Email"
								class="px-[20px] py-[25px] border border-black border-opacity-40 rounded-[18px] text-[18px]"
							>
							<button 
								type="submit" 
								class="px-[20px] py-[24px] bg-primary-color rounded-[18px] font-semibold text-[18px] hover:bg-primary-color-darker hover:text-white duration-300"
							>
								Получить код
							</button>
						</form>
					</div>
					<!-- Конец Формы ввода почты -->

					<!-- Форма ввода полученного кода -->
					<div 
						class="duration-300 transform w-full flex flex-col justify-between py-[21px] bg-white rounded-[29px] h-[256px]"
						:class="stepAuth === 2 && '-translate-x-[420px]'"
					>
						<div class="flex justify-between items-center px-[20px] w-[400px]">
							<ArrowBoldIcon class="cursor-pointer" @click="stepAuth = 1" />
							<p class="text-[22px] text-nowrap">Введите полученный код</p>
							<XIcon class="cursor-pointer w-6" @click="mainStore.setAuthModal(false); stepAuth = 1"/>
						</div>
						<hr class="border-black" />
						<form class="px-[34px]">
							<input 
								type="text" 
								name="code"
								placeholder="Код из письма"
								v-model="code"
								@beforeinput="(e) => {
									if (isNaN(e.data)) e.preventDefault()
								}"
								class="py-[30px] px-[20px] border border-black border-opacity-40 rounded-[18px] text-[18px] w-full"
							>
						</form>
						<p class="px-[34px]">Отправить повторно через 30 сек.</p>
					</div>
					<!-- Конец Формы ввода полученного кода -->
				</div>
			</div>
			<!-- Конец Авторизации/Регистрации -->
		</nav>
	</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import CompanyLogoIcon from '@/components/icons/CompanyLogoIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'
// import HeartIcon from '@/components/icons/HeartIcon.vue'
import CartIcon from '@/components/icons/CartIcon.vue'
import ProfileIcon from '@/components/icons/ProfileIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'
import Loader from '@/components/Loader.vue'
import ArrowBoldIcon from '@/components/icons/ArrowBoldIcon.vue'
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const mainStore = useMainStore()
const userStore = useUserStore()

const { mainInfo, headerOptions } = storeToRefs(mainStore)
const { isLoggedIn } = storeToRefs(userStore)

const router = useRouter()

const email = ref('')
const code = ref('')

const loaderAuth = ref(false)

const stepAuth = ref(1)

watch(code, (x) => {
	if (x.length == 6) {
		onAuth()
	}
})


const onSendEmail = () => {
	loaderAuth.value = true
	userStore.sendEmail(email.value, (status) => {
		if (status) {
			stepAuth.value = 2
		}
		loaderAuth.value = false
	})
}

const onAuth = () => {
	loaderAuth.value = true
	userStore.auth(email.value, code.value, (status) => {
		if (status) {
			mainStore.setAuthModal(false)
			stepAuth.value = 1
		}
		loaderAuth.value = false
	})
}


const handleClickOutsideKatalog = (e) => {
	if (
		e.target.getAttribute('id') != 'katalog' && 
		!e.target.closest('#katalogMain') && 
		!e.target.closest('#bigItemCatalog') && 
		!e.target.closest('#catalogFooterButton')
	) {
		mainStore.setCatalogShow(false)
	}
}

const handleClickOutsideAuth = (e) => {
	console.log(e.target.getAttribute('id'));
	if (
		!e.target.closest('#authModal') &&
		!e.target.closest('#auth-open-modal') &&
		!e.target.closest('#katalogMain')
	) {
		mainStore.setAuthModal(false)
		loaderAuth.value = false
		code.value = false
	}
}


onMounted(() => {
	document.addEventListener('click', handleClickOutsideKatalog)
	document.addEventListener('click', handleClickOutsideAuth)
})

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutsideKatalog)
	document.removeEventListener('click', handleClickOutsideAuth)
})
</script>
