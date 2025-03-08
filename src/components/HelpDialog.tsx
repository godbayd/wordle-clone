import SlDialog from '../../node_modules/@shoelace-style/shoelace/dist/react/dialog'

export function HelpDialog({ open, close }: {
	open: boolean
	close: () => void;
}) {
	return (
		<SlDialog
			open={open}
			className="helpDialog"
			onSlAfterHide={close}
		>
			<div className="helpDialog__con">
				<div className="helpDialog__block helpDialog__block--0" />
				letter is not in word
			</div>
			<div className="helpDialog__con">
				<div className="helpDialog__block helpDialog__block--1" />
				letter is in word but is in wrong spot
			</div>
			<div className="helpDialog__con">
				<div className="helpDialog__block helpDialog__block--2" />
				correct letter and spot
			</div>
		</SlDialog>
	)
}
