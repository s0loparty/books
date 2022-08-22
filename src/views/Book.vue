<template>
	<the-loader v-if="isLoading"></the-loader>
	<div class="my-5" v-else>
		<div v-if="book" class="grid gap-5 grid-cols-4">
			<div class="flex flex-col gap-5 col-span-4 sm:col-span-4 lg:col-span-1">
				<router-link 
					to="/" 
					class="flex flex-col gap-2 items-center h-max py-4 p-2 sm:p-5 rounded shadow-md transition-colors bg-violet-500 hover:bg-violet-600 text-white font-bold"
				>
					Вернуться к списку книг
				</router-link>
				<div class="flex flex-col gap-2 items-center h-max py-4 p-2 sm:p-5 rounded shadow-md bg-white">
					<BookImage :src="book.volumeInfo.imageLinks?.thumbnail" :alt="book.volumeInfo?.title" />
					<div class="text-gray-800 uppercase font-bold leading-normal">
						{{ book.volumeInfo?.publisher ?? VITE_TEXT_NONE }}
					</div>
					<div class="text-md text-gray-400 leading-normal">
						{{ book.volumeInfo?.publishedDate ?? VITE_TEXT_NONE }}
					</div>
				</div>
				<a 
					v-if="pdfLink"
					:href="pdfLink"
					class="flex items-center justify-center gap-2 h-max py-4 p-2 sm:p-5 rounded shadow-md w-full rounded bg-purple-500 text-white transition-colors hover:bg-purple-600" 
					target="_blank"
				>
					<span>Просмотреть PDF</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
					</svg>
				</a>
			</div>
			<div class="col-span-4 sm:col-span-4 lg:col-span-3 block py-4 p-2 sm:p-5 rounded shadow-md bg-white">
				<div>
					<div class="italic text-gray-500">
						{{ book.volumeInfo?.categories?.join(', ') ?? VITE_TEXT_NONE  }}
					</div>
					<div class="mt-4 text-[40px] font-bold text-gray-600">
						{{ book.volumeInfo?.title ?? VITE_TEXT_NONE }}
					</div>
					<div v-if="book.volumeInfo?.subtitle" class="mb-2 text-lg text-gray-600">
						{{ book.volumeInfo?.subtitle }}
					</div>
					<div class="mb-2 mt-4 text-gray-800 underline">
						{{ book.volumeInfo?.authors?.join(', ') ?? VITE_TEXT_NONE }}
					</div>
					<div class="text-md text-gray-500" v-html="book.volumeInfo?.description ?? ''"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BookImage from '../components/BookImage.vue'
import TheLoader from '../components/TheLoader.vue'

const router = useRouter()
const route = useRoute()

const isLoading = ref(true)

const { VITE_API_URL_BOOK, VITE_TEXT_NONE } = import.meta.env
const { id } = route.params

const book = ref(null)
const pdfLink = computed(() => book.value.accessInfo?.webReaderLink?.replace('play', 'books'), null)

const goMain = () => router.push('/')

onMounted(async () => {
	try {
		const response = await fetch(VITE_API_URL_BOOK + id)
		const data = await response.json()

		if (data.error) {
			throw 'Book not found'
		}

		book.value = data
		isLoading.value = false
	} catch (error) {
		console.log('error =>', error)
		goMain()
	} 
})
</script>
