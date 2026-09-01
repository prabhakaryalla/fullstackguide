import '@testing-library/jest-dom'

if (!window.matchMedia) {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: string) => ({
			media: query,
			matches: false,
			onchange: null,
			addListener: () => undefined,
			removeListener: () => undefined,
			addEventListener: () => undefined,
			removeEventListener: () => undefined,
			dispatchEvent: () => false,
		}),
	})
}

if (!window.ResizeObserver) {
	class ResizeObserver {
		observe() {
			return
		}
		unobserve() {
			return
		}
		disconnect() {
			return
		}
	}

	window.ResizeObserver = ResizeObserver
}
