import { useState, useEffect } from "react"

export function useTheme() {
	const [theme, set_theme] = useState('dark')
	function setDarkTheme() {
		set_theme('dark')
	}
	function setLightTheme() {
		set_theme('light')
	}
	function toggleTheme() {
		if (theme === 'light') setDarkTheme()
		else setLightTheme()
	}
	useEffect(() => {
		const htmlEl = document.querySelector('html') as HTMLHtmlElement
		htmlEl.classList.replace('sl-theme-light', `sl-theme-${theme}`)
		htmlEl.classList.replace('sl-theme-dark', `sl-theme-${theme}`)
	}, [theme])
	return {
		theme,
		setDarkTheme,
		setLightTheme,
		toggleTheme,
	}
}


