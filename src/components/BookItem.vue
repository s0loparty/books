<template>
	<router-link :to="'/b/' + props.id"
		class="block py-4 p-2 sm:p-5 rounded shadow-md bg-white hover:bg-purple-50 transition-colors">
		<BookImage :src="props.imageSrc" :alt="title" />
		<div class="flex flex-col justify-between items-center gap-2 mt-2">
			<div class="text-xl text-center" :title="title ?? VITE_TEXT_NONE">
				{{ shortTitle }}
			</div>
			<div class="text-sm italic text-center" :title="title">
				{{ shortAuthors }}
			</div>
			<div class="text-md text-fuchsia-600 font-bold text-center">
				{{ categories }}
			</div>
		</div>
	</router-link>
</template>

<script setup>
import { computed } from '@vue/reactivity';

import BookImage from './BookImage.vue';

const { VITE_TEXT_NONE } = import.meta.env

const props = defineProps({
	id: {
		type: String,
		required: true
	},
	imageSrc: {
		type: String,
		required: false
	},
	title: {
		type: String,
		required: false,
		default: ''
	},
	authors: {
		type: Array,
		required: false,
		default: null
	},
	categories: {
		type: Array,
		required: false,
		default: null
	}
})

const title = computed(() => (props.title ?? VITE_TEXT_NONE))
const shortTitle = computed(() => {
	return props.title.length > 60
		? props.title.slice(0, 60) + '...'
		: (props.title ?? VITE_TEXT_NONE)
})

const shortAuthors = computed(() => {
	return props.authors?.length > 5 
		? props.authors.slice(0, 5).join(', ') + ' и другие' 
		: (props.authors ? props.authors.join(', ') : VITE_TEXT_NONE
	)
})

const categories = computed(() => props.categories ? props.categories.join(', ') : VITE_TEXT_NONE)
</script>