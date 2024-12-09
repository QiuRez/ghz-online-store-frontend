<template>
	<footer class="footer">
		<div class="footer-nav-menu-phone">
			<nav class="h-full">
				<ul class="items-center justify-around flex list-none h-full">
					<li 
					 	@click="router.push({ name: 'home' })"
						class="footer-nav-menu-phone-item"
					>
						<HomeIcon />
						<p class="text-xs">Главная</p>
					</li>
					<li 
					 	@click="router.push({ name: 'cart' })"
						class="footer-nav-menu-phone-item"
						id='nav-cart-button'
					>
						<CartIcon :cartCount="cartCountProducts" />
						<p class="text-xs">Корзина</p>
					</li>
					<li 
						@click="catalogShow"
						id="catalogFooterButton"
						class="footer-nav-menu-phone-item"
					>
						<ListIcon />
						<p class="text-xs">Каталог</p>
					</li>
					<li 
					 	@click="isLoggedIn ? router.push({ name: 'userAccount'}) : ''"
						class="footer-nav-menu-phone-item"
					>
						<ProfileIcon />
						<p class="text-xs" v-if="isLoggedIn">Профиль</p>
						<p class="text-xs" v-else >Войти</p>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
	<!-- TODO: Дополнить футер информацией и полезные ссылки -->
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import HomeIcon from "@/components/icons/HomeIcon.vue"
import CartIcon from "@/components/icons/CartIcon.vue"
import ListIcon from "@/components/icons/ListIcon.vue"
import ProfileIcon from "@/components/icons/ProfileIcon.vue"
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const userStore = useUserStore()
const cartStore = useCartStore()

const { headerOptions } = storeToRefs(mainStore)
const { isLoggedIn } = storeToRefs(userStore)
const { cartCountProducts } = storeToRefs(cartStore)

const router = useRouter()

// TODO: Изменить routerName у тех items у которых есть страницы


const catalogShow = () => {
	mainStore.setCatalogShow(!headerOptions.value.catalogShow)
}

</script>