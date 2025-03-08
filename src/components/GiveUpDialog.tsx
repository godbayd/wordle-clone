import { Fragment, useState, } from 'react'
import { COLS, } from '@/game'
import SlButton from '../../node_modules/@shoelace-style/shoelace/dist/react/button'
import SlIconButton from '../../node_modules/@shoelace-style/shoelace/dist/react/icon-button'
import SlIcon from '../../node_modules/@shoelace-style/shoelace/dist/react/icon'
import SlDialog from '../../node_modules/@shoelace-style/shoelace/dist/react/dialog'

export function GiveUpDialog({
	open,
	close,
	word,
	resetGame,
}: {
	open: boolean
	close: () => void
	word: string,
	resetGame: () => void
}) {
	const [reveal, set_reveal] = useState(false)
	function afterHide() {
		if (reveal) {
			resetGame()
			close()
			set_reveal(false)
		} else {
			close()
		}
	}
	return (
		<SlDialog
			className="giveUpDialog"
			open={open}
			onSlAfterHide={afterHide}
		>
			<div className="giveUpDialog__con">
				{reveal ? (
					<SlIcon name="eye" />
				) : (
					<SlIconButton
						name="eye"
						onClick={() => set_reveal(true)}
					/>
				)}
				<pre
					style={{
						background: reveal
							? 'transparent'
							: 'lightblue',
					}}
				>
					{reveal ? word : ' '.repeat(COLS)}
				</pre>
			</div>
			{reveal ? (
				<Fragment>
					<p>game will restart with new word after this window is closed</p>
					<SlButton
						size="small"
						onClick={close}
					>
						close
					</SlButton>
				</Fragment>
			) : (
				<p>{'revealing word will end current game'}</p>
			)}
		</SlDialog>
	)
}
