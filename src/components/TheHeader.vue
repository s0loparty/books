<template>
	<header class="py-6 min-h[200px] bg-purple-500">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center gap-5">
				<form class="block relative max-w-[600px] w-full" @submit.prevent="fetchBooks">
					<input 
						v-model="store.queryParams.q"
						class="opacity-80 focus:opacity-100 transition-all delay-75 border-1 rounded pl-16 pr-5 h-16 w-full text-xl text-gray-500 focus:outline-0" 
						type="text"
						placeholder="Название книги"
					>
					<button class="absolute top-1/2 left-[20px] -translate-y-1/2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</button>
				</form>
				<div class="flex flex-wrap justify-center gap-5 w-full max-w-[600px]">
					<div class="flex flex-wrap w-full sm:w-[200px]">
						<select 
							v-model="store.queryParams.subject"
							name="subject" 
							id="subject" 
							class="opacity-80 focus:opacity-100 transition-all block px-3 min-w-[160px] py-2 w-full text-base font-normal text-gray-500 border bg-white rounded m-0 focus:outline-none"
						>
							<option value="all" selected>Все</option>
							<option value="art">Искуство</option>
							<option value="biography">Биография</option>
							<option value="computers">Компьютеры</option>
							<option value="history">История</option>
							<option value="medical">Медицина</option>
							<option value="poetry">Поэзия</option>
						</select>
					</div>
					<div class="flex flex-wrap w-full sm:w-[200px]">
						<select 
							v-model="store.queryParams.orderBy"
							name="orderBy" 
							id="orderBy" 
							class="opacity-80 focus:opacity-100 transition-all block px-3 min-w-[160px] py-2 w-full text-base font-normal text-gray-500 border bg-white rounded m-0 focus:outline-none"
						>
							<option value="relevance" selected>Актуальные</option>
							<option value="newest">Новые</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import useApi from '../composition/useApi'
import { store } from '../store'

const { fetchBooks } = useApi()
</script>