import { store } from "../store"

const { VITE_API_URL } = import.meta.env

export default function useFetch() {

	const createApiUrl = () => {
		let endpoint = VITE_API_URL
	
		Object.entries(store.queryParams).forEach(item => endpoint += item[0] + '=' + item[1] + '&')
	
		return endpoint.slice(0, -1)
	}

	const requestFetch = async () => {
		try {
			const response = await fetch(createApiUrl())
			const data = await response.json()

			return data
		} catch (error) {
			console.warn(error)
			return error
		} finally {
			store.isLoading = false
			store.isMoreLoading = false
		}
	}

	const fetchBooks = async () => {
		if (store.queryParams.q.length < 2) {
			return alert('Название книги должно быть больше чем 2 буквы')
		}

		store.isLoading = true
		store.books = []
	
		const { items, totalItems } = await requestFetch()
		
		if (totalItems && items) {
			store.books.push(...items)
			store.totalBooks = totalItems
		}
	
		store.removeMoreLoadingBtn = store.queryParams.startIndex > totalItems
	}

	const fetchMoreBooks = async () => {
		store.isMoreLoading = true
		store.queryParams.startIndex = store.queryParams.startIndex + store.queryParams.maxResults
	
		const { items, totalItems } = await requestFetch()
	
		if (items && totalItems) {
			store.totalBooks = totalItems
			store.books.push(...items)
	
			store.removeMoreLoadingBtn = store.queryParams.startIndex > store.totalBooks
		}
	}

	return { fetchBooks, fetchMoreBooks }
}