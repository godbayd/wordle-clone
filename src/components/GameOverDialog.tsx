import { useEffect, useState } from 'react'
import { Wordle, } from '@/game'
import SlButton from '../../node_modules/@shoelace-style/shoelace/dist/react/button'
import SlIcon from '../../node_modules/@shoelace-style/shoelace/dist/react/icon'
import SlDialog from '../../node_modules/@shoelace-style/shoelace/dist/react/dialog'

export function GameOverDialog({ wordle }: { wordle: Wordle }) {
	const [open, set_open] = useState(false)
	useEffect(() => {
		if (wordle.isGameOver && !open) set_open(true)
	}, [wordle.isGameOver])
	return (
		<SlDialog
			className="gameOverDialog"
			open={wordle.isGameOver && open}
			onSlAfterHide={wordle.reset}
			noHeader
		>
			<p>{'you ' + (wordle.gameOver?.isWin ? 'win' : 'lose')}</p>
			<SlButton size="small" onClick={() => set_open(false)}>
				play again
				<SlIcon name="arrow-counterclockwise" />
			</SlButton>
		</SlDialog>
	)
}
