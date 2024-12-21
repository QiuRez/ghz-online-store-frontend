<template>
	<div class="header">
		<nav class="flex gap-4 flex-col md:flex-row justify-between md:items-center max-w-[1280px] m-auto h-full relative">
			<div class="flex justify-between md:items-center md:gap-5">
				<CompanyLogoIcon class="w-auto h-8"/>
				<div class="px-5 h-8 primary-button cursor-pointer" @click="mainStore.updateHeaderOptions({selectCityModal: true})" id="open-select-city">
					<p class="text-nowrap">{{ mainInfo.city }}</p>
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
				<div class="search-phone-form" :class="searchItems.length && '!rounded-[.5rem_.5rem_0_0]'">
					<input type="text" @input="searchInput" @focus="searchInput" v-model="q" class="search-phone-input" placeholder="Поиск по сайту">
					<SearchSelect v-if="searchItems.length" :items="searchItems" @onSelect="searchItems = []" />
					<button class="search-phone-button"><SearchIcon /></button>
				</div>

				<div class="md:flex gap-2 hidden">

					<!-- TODO: Добавить функционал на дипломную -->
					<!-- <div class="header_action_button">
						<HeartIcon />
						<p class="opacity-[0.67]">Избранное</p>
					</div> -->

					<div 
						@click="isLoggedIn ? router.push({name: 'cart'}) : mainStore.setAuthModal(true)"
						class="header_action_button"
						id="nav-cart-button"
					>
						<CartIcon :cartCount="cartCountProducts" :showCount="true" />
						<p 
							v-if="!cartAllPrice"
							class="opacity-[0.67]"
						>
							Корзина
						</p>
						<p v-else class="font-semibold">{{ cartAllPrice }} ₽</p>
					</div>

					<div 
						id="auth-open-modal"
						@click="isLoggedIn ? logout() : mainStore.setAuthModal(true)"
						class="header_action_button"
					>
						<ProfileIcon />
						<!-- TODO: Сделать страницу профиля на диплом -->
						<p class="opacity-[0.67]" v-if="!isLoggedIn">Войти</p>
						<p class="opacity-[0.67]" v-else>Выйти</p>
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
				v-if="headerOptions.authModal"
				class="flex fixed inset-0 bg-black bg-opacity-40 z-[60] items-center justify-center"
			>
				<div 
					id="authModal" 
					class="md:w-[400px] w-[350px] relative flex flex-row flex-nowrap overflow-hidden gap-[20px] items-center"
					
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
						class="flex flex-col gap-[22px] w-[350px] min-w-[350px] md:w-[400px]  md:min-w-[400px] transform duration-300 bg-white rounded-[29px] py-[22px]"
						:class="stepAuth === 2 && 'md:-translate-x-[420px] -translate-x-[370px]'"
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
						:class="stepAuth === 2 && 'md:-translate-x-[420px] -translate-x-[370px]'"
					>
						<div class="flex justify-between items-center px-[20px] w-[350px] md:w-[400px]">
							<ArrowBoldIcon class="cursor-pointer" @click="stepAuth = 1" />
							<p class="text-lg md:text-[22px] text-nowrap">Введите полученный код</p>
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
						<p v-if="!sendReply" class="px-[34px]">Отправить повторно через {{ timerSecond }} сек.</p>
						<p v-else class="px-[34px] text-blue-500 cursor-pointer" @click="onSendEmail">Отправить код</p>
					</div>
					<!-- Конец Формы ввода полученного кода -->
				</div>
			</div>
			<!-- Конец Авторизации/Регистрации -->

			
			<div 
				v-if="headerOptions.selectCityModal"
				class="flex fixed inset-0 bg-black bg-opacity-40 z-[60] items-center justify-center"
			>
				<div 
					id="selectCountry" 
					class="md:w-[400px] w-[350px] overflow-auto h-[400px] md:h-auto relative bg-white rounded-lg p-5 flex flex-col"
					
				>
				<XIcon class="cursor-pointer w-6 min-h-5 self-end" @click="mainStore.updateHeaderOptions({selectCityModal: false})"/>
				<div class="flex flex-wrap  gap-[20px] w-full">
					<p v-for="city of cities" class="w-full md:w-[45%] cursor-pointer hover:underline" @click="onSelectCity(city)">{{ city }}</p>
				</div>
				</div>
			</div>
		</nav>
		<Toast group="auth" position="top-center" />
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
import SearchSelect from '@/components/SearchSelect.vue'
import ArrowBoldIcon from '@/components/icons/ArrowBoldIcon.vue'
import { useToast } from "vue-toastification";
import { useMainStore } from '@/stores/main'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const mainStore = useMainStore()
const userStore = useUserStore()
const cartStore = useCartStore()
const productStore = useProductStore()

const { mainInfo, headerOptions } = storeToRefs(mainStore)
const { isLoggedIn } = storeToRefs(userStore)
const { cartAllPrice, cartCountProducts } = storeToRefs(cartStore)

const router = useRouter()

const toast = useToast()

const email = ref('')
const code = ref('')

const q = ref('')
const searchItems = ref([])

const loaderAuth = ref(false)

const stepAuth = ref(1)

watch(code, (x) => {
	if (x.length == 6) {
		onAuth()
	}
})

const timerSecond = ref(30)
const sendReply = ref(false)

const timer = () => {
	const interval = setInterval(() => {
		if (timerSecond.value != 1) {
			timerSecond.value--
		} else {
			clearInterval(interval)
			sendReply.value = true;
			timerSecond.value = 30
		}
	}, 1000)
}

const onSendEmail = () => {
	loaderAuth.value = true
	userStore.sendEmail(email.value, (status) => {
		if (status) {
			stepAuth.value = 2
			sendReply.value = false
			timer()
		}
		loaderAuth.value = false
	})
}

watch(isLoggedIn, (x) => {
	if (x) {
		cartStore.getCart()
	}
})

const onAuth = () => {
	loaderAuth.value = true
	userStore.auth(email.value, code.value, (status) => {
		if (status) {
			toast.success('Вы успешно авторизовались!')
			mainStore.setAuthModal(false)
			timer()
			stepAuth.value = 1
		}
		loaderAuth.value = false
	})
}

let timeout;

const searchInput = () => {
	clearTimeout(timeout);
	if (q.value.length) {
		timeout = setTimeout(() => {
			productStore.searchProduct(q.value, (items) => {
				if (items) {
					searchItems.value = items
				} else {
					return false
				}
			})
		}, 400)
	} else {
		searchItems.value = []
	}
}

const onSelectCity = (city) => {
	mainStore.updateMainInfo({ city: city})
	mainStore.updateHeaderOptions({selectCityModal: false})
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
	if (
		!e.target.closest('#authModal') &&
		!e.target.closest('#auth-open-modal') &&
		!e.target.closest('#katalogMain') &&
		!e.target.closest('#nav-cart-button')
	) {
		mainStore.setAuthModal(false)
		loaderAuth.value = false
		code.value = ''
	}
}

const handleClickOutsideSelectCountry = (e) => {
	if (!e.target.closest('#selectCountry') && !e.target.closest('#open-select-city')) {

		mainStore.updateHeaderOptions({selectCityModal: false})
	}
}

const logout = () => {
	userStore.preventLogout()
	router.push({name: 'home'})
}

const cities = [
	'Санкт-Петербург',
	'Москва',
	'Нижний Новгород',
	'Казань',
	'Сочи',
	'Калининград',
	'Архангельск',
	'Астрахань',
	'Владимир',
	'Владивосток',
	'Волгоград',
	'Тобольск',
	'Воронеж',
	'Ростов-на-Дону',
	'Екатеринбург',
	'Иркутск',
	'Суздаль',
	'Йошкар-Ола',
	'Ярославль',
	'Кострома',
	'Тюмень'
];


onMounted(() => {
	document.addEventListener('click', handleClickOutsideKatalog)
	document.addEventListener('click', handleClickOutsideAuth)
	document.addEventListener('click', handleClickOutsideSelectCountry)
})

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutsideKatalog)
	document.removeEventListener('click', handleClickOutsideAuth)
	document.removeEventListener('click', handleClickOutsideSelectCountry)
})
</script>
