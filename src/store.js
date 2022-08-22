import { reactive } from "@vue/reactivity";

export const store = reactive({
	queryParams: {
		q: 'KFC',
		subject: 'all',
		orderBy: 'relevance',
		startIndex: 0,
		maxResults: 30
	},
	isLoading: false,
	isMoreLoading: false,
	removeMoreLoadingBtn: false,
	totalBooks: 0,
	books: []
})