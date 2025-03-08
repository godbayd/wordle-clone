import { useState, } from 'react'
import words from './words.json'

export const COLS = 5
export const ROWS = 6

export type Coords = { row: number; col: number }
export type Board = (null | string)[][]
export type Attempt_Letter = { letter: string, code: 0 | 1 | 2 }

export type Wordle = ReturnType<typeof useWordle>

const initBoard: Board = [
	[null, null, null, null, null],
	[null, null, null, null, null],
	[null, null, null, null, null],
	[null, null, null, null, null],
	[null, null, null, null, null],
	[null, null, null, null, null],
]

export function useWordle() {
	const initWord = getRandomWord()
	// const initWord = 'marks'
	const [word, set_word] = useState(initWord)
	const [gameOver, set_gameOver] = useState<{ isWin: boolean } | null>(null)
	const [board, set_board] = useState(initBoard)
	const [attempts, set_attempts] = useState<Attempt_Letter[][]>([])
	const coords = getCoords()
	const isGameOver = gameOver !== null
	return {
		attempts,
		word,
		board,
		gameOver,
		reset,
		isGameOver,
		attemptWord,
		deleteLetter,
		addLetter,
	}
	function reset() {
		set_word(getRandomWord())
		set_gameOver(null)
		set_board(structuredClone(initBoard))
		set_attempts([])
	}
	function attemptWord(onWrongWord: () => any) {
		const row = board[coords.row]
		if (row.filter(Boolean).length !== COLS) return;
		if (!words.includes(row.join(''))) return onWrongWord()
		const attempt = genAttempt(word, row as string[])
		set_attempts(p => [...p, attempt])
		handleGameOver(attempt)
	}
	function deleteLetter() {
		set_board(p => {
			const b = structuredClone(p)
			if (b[coords.row].filter(Boolean).length === COLS)
				b[coords.row][COLS - 1] = null
			else
				b[coords.row][Math.max(0, coords.col - 1)] = null
			return b
		})
	}
	function addLetter(letter: string) {
		set_board(p => {
			const b = structuredClone(p)
			b[coords.row][coords.col] = letter
			return b
		})
	}
	function handleGameOver(attempt: Attempt_Letter[]) {
		const match = Boolean(attempt?.every(({ code }) => code === 2))
		const gameEnd = match || ([...attempts, attempt].length === ROWS && !match)
		if (gameEnd) set_gameOver({ isWin: match })
	}
	function getCoords() {
		const currentRow = Math.min(ROWS - 1, attempts.length)
		const currentCol = Math.min(COLS - 1, board[currentRow].filter(Boolean).length)
		return {
			row: currentRow,
			col: currentCol,
		}
	}
}

function getRandomWord() {
	const len = words.length
	return words[rand(0, len - 1)]
	function rand(min: number, max: number) {
		// mdn
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
	}
}

function genAttempt(word: string, row: string[]) {
	const availCount: { [key: string]: number } = {}
	for (const l of [...word]) {
		availCount[l] = amtOfLettersInLetterList(l, [...word])
	}
	type Acc = { letter: string; code: 0 | 1 | 2; i: number }[]
	const correct = row.reduce<Acc>((acc, letter, i) => {
		if (letter === word[i]) {
			availCount[letter]--
			return [...acc, { letter, code: 2, i }]
		}
		return acc
	}, [])
	const misplaced = row.reduce<Acc>((acc, letter, i) => {
		if (availCount[letter] && word.includes(letter)) {
			availCount[letter]--
			return [...acc, { letter, code: 1, i }]
		}
		return acc
	}, [])
	return row
		.map((letter, i) => {
			const cor = correct.find(c => c.i === i)
			if (cor) return cor
			const mis = misplaced.find(m => m.i === i)
			if (mis) return mis
			return { letter, code: 0 } as Attempt_Letter
		})
}

function amtOfLettersInLetterList(letter: string, word: string[]) {
	return word.reduce((acc, l) => l === letter ? acc + 1 : acc, 0)
}

