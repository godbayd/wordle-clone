import { Wordle } from "@/game"
import { clsx } from "clsx"
import SlButton from '../../node_modules/@shoelace-style/shoelace/dist/react/button'
import SlIcon from '../../node_modules/@shoelace-style/shoelace/dist/react/icon'

export function Keyboard({
	wordle,
	showWrongWordAlert,
}: {
	wordle: Wordle
	showWrongWordAlert: () => void
}) {
	const keys = [
		'qwertyuiop'.split(''),
		'asdfghjkl'.split(''),
		['enter', ...('zxcvbnm'.split('')), 'delete']
	]
	function handleKeyClick(key: string) {
		return () => {
			if (wordle.isGameOver) return
			switch (key) {
				case 'enter':
					return wordle.attemptWord(showWrongWordAlert)
				case 'delete':
					return wordle.deleteLetter()
				default:
					wordle.addLetter(key)
			}
		}
	}
	const clueMap: { [key: string]: number } = {}
	for (const row of wordle.attempts) {
		for (const { letter, code } of row) {
			if (letter in clueMap) {
				clueMap[letter] = Math.max(clueMap[letter], code)
			} else {
				clueMap[letter] = code
			}
		}
	}
	return (
		<div className="keyboard">
			{keys.map((row, ridx) => {
				return (
					<div
						key={ridx}
						className="keyboard__row"
					>
						{row.map(key => {
							const classList = clsx({
								keyboard__key: true,
								'keyboard__key--0': clueMap[key] === 0,
								'keyboard__key--1': clueMap[key] === 1,
								'keyboard__key--2': clueMap[key] === 2,
								'keyboard__key--enter': key === 'enter',
							})
							return (
								<SlButton
									key={key}
									className={classList}
									size="small"
									onClick={handleKeyClick(key)}
								>
									{
										key === 'delete'
											? (
												<SlIcon name="backspace" />
											) : key
									}
								</SlButton>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}


