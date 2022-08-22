<template>
	<img :src="props.src ?? VITE_IMAGE_NONE" :alt="props.alt ?? VITE_TEXT_NONE" :title="props.alt ?? VITE_TEXT_NONE" class="block min-w-[140px] min-h-[180px] mx-auto rounded border-2 border-purple-100 hover:scale-105 transition-all">
</template>

<script setup>
const { VITE_TEXT_NONE, VITE_IMAGE_NONE } = import.meta.env

const props = defineProps({
	src: {
		type: String,
		required: false,
		default: null
	},
	alt: {
		type: String,
		required: false,
		default: null,
	}
})
</script>
