<template>
	<!-- TODO: Дополнить футер информацией и полезные ссылки -->


	<!-- For mobile/tablet menu -->
	<div class="footer-nav-menu-phone">
		<nav class="h-full">
			<ul class="items-center justify-around flex list-none h-full">
				<li v-for="item in menuItemsPhone" @click="router.push({ name: item.routerName })"
					class="footer-nav-menu-phone-item">
					<component :is="item.icon" />
					<p class="text-xs">{{ item.text }}</p>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router"
import HomeIcon from "@/components/icons/HomeIcon.vue"
import CartIcon from "@/components/icons/CartIcon.vue"
import ListIcon from "@/components/icons/ListIcon.vue"
import ProfileIcon from "@/components/icons/ProfileIcon.vue"

const router = useRouter()

// TODO: Изменить routerName у тех items у которых есть страницы
const menuItemsPhone = [
	{
		icon: HomeIcon,
		text: 'Главная',
		routerName: 'home'
	},
	{
		icon: CartIcon,
		text: 'Корзина',
		routerName: 'cart'
	},
	{
		icon: ListIcon,
		text: 'Каталог',
		routerName: 'home'
	},
	{
		icon: ProfileIcon,
		text: 'Профиль',
		routerName: 'home'
	},
]


</script>