<template>
	<div class="p-4 header-phone">
		<nav class="flex gap-3 flex-col">
			<div class="flex justify-between">
				<CompanyLogoIcon class="w-auto h-8"/>
				<div class="px-5 h-8 primary-button">
					<p>Тюмень</p>
					<!-- TODO: Сделать детект города + выбор города через поп ап -->
				</div>
			</div>
			<div>
				<!-- TODO: Сделать рабочий поиск -->
				<form action="" method="GET" class="search-phone-form">
					<input type="text" name="s" class="search-phone-input">
					<button class="search-phone-button"><SearchIcon /></button>
				</form>

			</div>
		</nav>
	</div>
</template>

<script setup>
import CompanyLogoIcon from '@/components/icons/CompanyLogoIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'

</script>
