import { StrictMode, useState, } from 'react'
import { createRoot } from 'react-dom/client'
import { useWordle } from './game'
import { setBasePath } from '../node_modules/@shoelace-style/shoelace/dist/utilities/base-path'
import { GiveUpDialog } from './components/GiveUpDialog'
import { useTheme } from './useTheme'
import { GameOverDialog } from '@/components/GameOverDialog'
import { Keyboard } from '@/components/Keyboard'
import { BoardGrid } from '@/components/BoardGrid'
import { WrongWordAlert } from '@/components/WrongWordAlert'
import { HelpDialog } from '@/components/HelpDialog'
import SlButton from '../node_modules/@shoelace-style/shoelace/dist/react/button'
import SlIcon from '../node_modules/@shoelace-style/shoelace/dist/react/icon'
import './index.scss'

setBasePath(`${import.meta.env.BASE_URL}shoelace/`)

function App() {
	const { theme, toggleTheme } = useTheme()
	const [isWrongWord, set_isWrongWord] = useState(false)
	const [openHelpDialog, set_openHelpDialog] = useState(false)
	const [openGiveUpModal, set_openGiveUpModal] = useState(false)
	const wordle = useWordle()
	return (
		<div className="app">
			<header className="topbar">
				<h2 className="topbar__brand">wordle</h2>
				<SlButton
					disabled={!Boolean(wordle.attempts.length)}
					size="small"
					onClick={() => set_openGiveUpModal(true)}
				>
					give up
				</SlButton>
				<SlButton
					className="themeBtn"
					size="small"
					onClick={toggleTheme}
				>
					<SlIcon name={theme === 'dark' ? 'sun' : 'moon'} />
				</SlButton>
				<SlButton
					size="small"
					onClick={() => set_openHelpDialog(true)}
				>
					<SlIcon name="info-lg" />
				</SlButton>
			</header>
			<div className="app__mid">
				<BoardGrid
					board={wordle.board}
					attempts={wordle.attempts}
				/>
			</div>
			<Keyboard
				wordle={wordle}
				showWrongWordAlert={() => set_isWrongWord(true)}
			/>
			<HelpDialog
				open={openHelpDialog}
				close={() => set_openHelpDialog(false)}
			/>
			<WrongWordAlert
				open={isWrongWord}
				close={() => set_isWrongWord(false)}
			/>
			<GameOverDialog wordle={wordle} />
			<GiveUpDialog
				open={openGiveUpModal}
				close={() => set_openGiveUpModal(false)}
				word={wordle.word}
				resetGame={wordle.reset}
			/>
		</div>
	)
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
