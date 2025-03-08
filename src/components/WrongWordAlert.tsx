import SlAlert from '../../node_modules/@shoelace-style/shoelace/dist/react/alert'

export function WrongWordAlert({
	open,
	close,
}: {
	open: boolean
	close: () => void
}) {
	return (
		<SlAlert
			className="wrongWordAlert"
			open={open}
			onSlAfterHide={close}
			duration={1000}
			variant="warning"
			closable
		>
			<p>word does not exist in list</p>
		</SlAlert>
	)
}
