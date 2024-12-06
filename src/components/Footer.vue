<template>
	<footer class="footer">
		<div class="footer-nav-menu-phone">
			<nav class="h-full">
				<ul class="items-center justify-around flex list-none h-full">
					<li v-for="item in menuItemsPhone"
						:id="item.id"
					 	@click="item.routerName ? router.push({ name: item.routerName }) : ''"
						class="footer-nav-menu-phone-item"
					>
						<component :is="item.icon" />
						<p class="text-xs">{{ item.text }}</p>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
	<!-- TODO: Дополнить футер информацией и полезные ссылки -->


	<!-- For mobile/tablet menu -->
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import HomeIcon from "@/components/icons/HomeIcon.vue"
import CartIcon from "@/components/icons/CartIcon.vue"
import ListIcon from "@/components/icons/ListIcon.vue"
import ProfileIcon from "@/components/icons/ProfileIcon.vue"
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { headerOptions } = storeToRefs(mainStore)

const router = useRouter()

// TODO: Изменить routerName у тех items у которых есть страницы
const menuItemsPhone = [
	{
		icon: HomeIcon,
		text: 'Главная',
		id: '',
		routerName: 'home'
	},
	{
		icon: CartIcon,
		text: 'Корзина',
		id: '',
		routerName: 'cart'
	},
	{
		icon: ListIcon,
		text: 'Каталог',
		id: 'catalogFooterButton',
		// routerName: 'catalog',
	},
	{
		icon: ProfileIcon,
		text: 'Профиль',
		id: '',
		routerName: 'home'
	},
]

const catalogShow = () => {
	mainStore.setCatalogShow(!headerOptions.value.catalogShow)
}

onMounted(() => {
	const catalog = document.querySelector('#catalogFooterButton')

	catalog.addEventListener('click', catalogShow);
})

</script>