import { clsx } from "clsx"
import { Board, Attempt_Letter } from "../game"

export function BoardGrid(props: { board: Board, attempts: Attempt_Letter[][] }) {
	return (
		<div className="board">
			{props.board.map((row, ridx) => {
				return row.map((letter, cidx) => {
					const check = (x: number) =>
						props.attempts?.at(ridx)?.at(cidx)?.code === x
					const classList = clsx({
						board__letter: true,
						'board__letter--0': check(0),
						'board__letter--1': check(1),
						'board__letter--2': check(2),
					})
					return (
						<div key={`${ridx}${cidx}`} className={classList}>
							{letter || ''}
						</div>
					)
				})
			})}
		</div>
	)
}
