import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
	base: '/wordle-clone/',
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					src: './shoelace/assets/icons/*.svg',
					dest: './shoelace/assets/icons',
				},
			]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		}
	}
})
