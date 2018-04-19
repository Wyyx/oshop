export class PageUtil {
	private page: Page
	private size: number
	source: any[]

	constructor(size: number, source: any[]) {
		this.size = size
		this.source = source
	}

	getPage(pageNumber: number) {
		this.page = new Page()

		// set page
		this.page.source = this.source
		this.page.size = this.size
		this.page.totalPages =
			Math.floor(this.page.source.length / this.page.size) +
			(this.page.source.length % this.page.size == 0 ? 0 : 1)
		this.page.currentPage = pageNumber
		this.page.isFirstPage = this.page.currentPage == 1 ? true : false
		this.page.isLastPage = this.page.currentPage == this.page.totalPages ? true : false
		this.page.totalElements = this.page.source.length
		this.page.startIndex = (this.page.currentPage - 1) * this.page.size
		this.page.endIndex =
			this.page.currentPage < this.page.totalPages
				? this.page.startIndex + this.page.size - 1
				: this.page.totalElements % this.page.size == 0
					? this.page.totalElements - 1
					: this.page.startIndex +
						this.page.totalElements -
						(this.page.currentPage - 1) * this.page.size
		this.page.content = this.page.source.slice(this.page.startIndex, this.page.endIndex + 1)
		this.page.currentPageElements = this.page.content.length

		// return page
		return this.page
	}

	previousPage() {
		if (this.page.currentPage > 1) {
			this.page.currentPage--
			this.page = this.getPage(this.page.currentPage)
		}

		return this.page
	}

	nextPage() {
		if (this.page.currentPage < this.page.totalPages) {
			this.page.currentPage++
			this.page = this.getPage(this.page.currentPage)
		}

		return this.page
	}

	getPageNumbers(pageNumbersSize: number) {
		let firstPageNumber =
			Math.floor((this.page.currentPage - 1) / pageNumbersSize) * pageNumbersSize + 1
		console.log('currentPage: ', this.page.currentPage)

		let pageNumbers: number[] = new Array()
		for (let i = 0; i < pageNumbersSize; i++) {
			if (firstPageNumber <= this.page.totalPages) {
				pageNumbers.push(firstPageNumber)
				firstPageNumber++
			}
		}

		return pageNumbers
	}
}

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
}
