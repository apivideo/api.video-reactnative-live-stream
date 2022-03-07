import { StyleSheet } from 'react-native'

export default (
	streaming: boolean
) => StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'pink',
	},
	box: {
		flex: 1,
		backgroundColor: 'green',
	},
	livestreamView: {
		flex: 1,
		backgroundColor: 'black',
		alignSelf: 'stretch'
	},
	streamButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 60,
		width: streaming ? 50 : undefined,
		height: streaming ? 50 : undefined,
		backgroundColor: streaming ? undefined : '#8137FF',
		paddingVertical: streaming ? undefined : 15,
		paddingHorizontal: streaming ? undefined : 25
	},
	streamText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '700'
	},
	resolutionButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
		backgroundColor: 'yellow',
		width: 50,
		height: 50,
	},
	audioButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50,
	},
	cameraButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50,
	}
})

interface IButtonParams {
	top?: number,
	bottom?: number,
	left?: number,
	right?: number
}

export const button = (position: IButtonParams) => StyleSheet.create({
	container: {
		position: 'absolute',
		top: position.top,
		bottom: position.bottom,
		left: position.left,
		right: position.right
	}
})
