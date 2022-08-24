<template>
	<TheHeader />

	<main>
		<div class="container mx-auto px-4">
			<RouterView></RouterView>
		</div>
	</main>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
</script>
