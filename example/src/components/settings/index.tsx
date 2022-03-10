import React from 'react'
import { 
	Modal,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Section from './sections'
import styles from './style'
import assets from '../../assets'

interface ISettingsProps {
	closeSettings: () => void
	setVideoBitrate: (bitrate: number) => void
	handleChangeTextInput: (value: string, input: 'RTMP endpoint' | 'Stream key') => void
	handleChangeSettingItem: (value: string | number, key: string) => void
	settings: {
		resolution: string
		framerate: number
		videoBitrate: number
		audioBitrate: number
		rtmpEndpoint: string
		streamKey: string
	}
}

export type Opensection = 
| 'resolution'
| 'framerate'
| 'bitrateAudio'
| null

const Settings: React.FC<ISettingsProps> = ({
	closeSettings,
	setVideoBitrate,
	handleChangeTextInput,
	handleChangeSettingItem,
	settings
}): JSX.Element => {
	const [openSection, setOpenSection] = React.useState<Opensection>(null)

	return (
		<Modal
			animationType='slide'
			visible
		>
			<SafeAreaView
				style={styles.modalView}
			>
				<View style={styles.settingsHeader}>
					<Text style={styles.settingsTitle}>
						Settings
					</Text>

					<TouchableOpacity
						style={styles.closeButton}
						onPress={closeSettings}
					>
						<Icon 
							name="close-outline" 
							size={30} 
							color="#FFFFFF"
						/>
					</TouchableOpacity>
				</View>

				{Object.keys(assets.sections).map(sectionName => (
					<Section 
						key={sectionName}
						sectionName={sectionName}
						openSection={openSection} 
						setOpenSection={setOpenSection}
						setVideoBitrate={setVideoBitrate}
						handleChangeTextInput={handleChangeTextInput}
						handleChangeSettingItem={handleChangeSettingItem}
						settings={settings}
					/>
				))}

			</SafeAreaView>
		</Modal>
	)
}

export default Settings
