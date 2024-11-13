<template>
	<div class="header-phone">
		<nav class="flex gap-4 flex-col md:flex-row justify-between md:items-center max-w-[1280px] m-auto h-full">
			<div class="flex justify-between md:items-center md:gap-5">
				<CompanyLogoIcon class="w-auto h-8"/>
				<div class="px-5 h-8 primary-button">
					<p>Тюмень</p>
					<!-- TODO: Сделать детект города + выбор города через поп ап -->
				</div>
			</div>
			<div class="primary-button px-4 py-3 !hidden md:!flex !rounded-[7px] gap-3 cursor-pointer">
				<p class="text-[15px] opacity-60">Каталог</p>
				<ArrowDownIcon class="w-4"/>
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

					<div class="header_action_button">
						<ProfileIcon />
						<p class="opacity-[0.67]">Войти</p>
					</div>
				</div>


		</nav>
	</div>
</template>

<script setup>
import CompanyLogoIcon from '@/components/icons/CompanyLogoIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import CartIcon from '@/components/icons/CartIcon.vue'
import ProfileIcon from '@/components/icons/ProfileIcon.vue'
</script>
