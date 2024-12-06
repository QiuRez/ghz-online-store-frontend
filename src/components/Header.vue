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

			<!-- Авторизация -->
			<div 
				:class="headerOptions.authModal ? 'flex' : 'hidden'"
				class="fixed inset-0 bg-black bg-opacity-40 z-30 items-center justify-center"
			>
				<div id="authModal" class="bg-white flex flex-col gap-[22px] rounded-[29px] py-[22px] w-[400px]">
					<div class="flex justify-between items-center px-[16px]">
						<p class="text-[22px] leading-6">Войти <br> или зарегистрироваться</p>
						<XIcon class="cursor-pointer" @click="mainStore.setAuthModal(false)"/>
					</div>
					<hr class="border-black" />
					<form action="">

					</form>
				</div>
			</div>
			<!-- Конец Авторизации -->
		</nav>
	</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import CompanyLogoIcon from '@/components/icons/CompanyLogoIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'
// import HeartIcon from '@/components/icons/HeartIcon.vue'
import CartIcon from '@/components/icons/CartIcon.vue'
import ProfileIcon from '@/components/icons/ProfileIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const mainStore = useMainStore()
const userStore = useUserStore()

const { mainInfo, headerOptions } = storeToRefs(mainStore)
const { isLoggedIn } = storeToRefs(userStore)

const router = useRouter()


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
		// !e.target.closest('#bigItemCatalog') && 
		// !e.target.closest('#catalogFooterButton')
	) {
		mainStore.setAuthModal(false)
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
