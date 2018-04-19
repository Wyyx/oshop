export class Page {
	source: any[]
	size: number
	totalPages: number
	currentPage: number
	isFirstPage: boolean
	isLastPage: boolean
	totalElements: number
	startIndex: number
	endIndex: number
	content: any[]
	currentPageElements: number

	constructor(source: any[]) {
		this.source = source
	}

	getPage(currentPage: number, size: number) {
		// set page
		this.source = this.source
		this.size = size
		this.totalPages =
			Math.floor(this.source.length / this.size) + this.source.length % this.size
		this.currentPage = currentPage
		this.isFirstPage = this.currentPage == 1 ? true : false
		this.isLastPage = this.currentPage == this.totalPages ? true : false
		this.totalElements = this.source.length
		this.startIndex = (this.currentPage - 1) * this.size
		this.endIndex =
			this.currentPage < this.totalPages
				? (this.currentPage - 1) * this.size + this.size - 1
				: (this.currentPage - 1) * this.size + this.source.length % this.size - 1
		this.content = this.source.slice(this.startIndex, this.endIndex + 1)
		this.currentPageElements = this.content.length

		// return page
		return this
	}

	previousPage() {
		if (this.currentPage > 1) {
			this.currentPage--
			this.getPage(this.currentPage, this.size)
			return this
		}
	}

	nextPage() {
		console.log('in nextPage()')
		if (this.currentPage < this.totalPages) {
			this.currentPage++
			console.log(this.currentPage)
			this.getPage(this.currentPage, this.size)
			console.log(this.content)
			return this
		}
	}
}
