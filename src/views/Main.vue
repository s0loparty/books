<template>
	<TheLoader v-if="store.isLoading"></TheLoader>
	<div v-if="store.books.length && !store.isLoading" class="my-5">
		<div class="mb-2">Найдено <b>{{ store.totalBooks }}</b> книг</div>
		<TransitionGroup tag="div" name="list" class="grid gap-12 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			<book-item 
				v-for="book in store.books" 
				:key="book.id"
				:id="book.id"
				:image-src="book.volumeInfo?.imageLinks?.thumbnail"
				:title="book.volumeInfo?.title"
				:authors="book.volumeInfo?.authors"
				:categories="book.volumeInfo?.categories"
			></book-item>
			<button 
				v-if="!store.removeMoreLoadingBtn"
				@click.prevent="fetchMoreBooks"
				:disabled="store.isMoreLoading || store.removeMoreLoadingBtn"
				:class="['p-5', 'rounded', 'shadow-md', 'bg-white', 'hover:bg-purple-50', 'transition-colors', 'disabled:cursor-not-allowed', 'disabled:bg-gray-100', store.removeMoreLoadingBtn ? 'hidden' : 'block']"
			>
				{{ store.isMoreLoading ? 'Подождите ...' : 'Показать ещё +' }}
			</button>
		</TransitionGroup>
	</div>
	<div v-if="!store.books.length && !store.isLoading" class="mt-12 text-center font-bold text-2xl text-gray-500">
		GO GO SEARCH BOOKS!!!
	</div>
</template>

<script setup>
import { store } from '../store'
import useApi from '../composition/useApi'

import BookItem from '../components/BookItem.vue'
import TheLoader from '../components/TheLoader.vue'

const { fetchMoreBooks } = useApi()
</script>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>