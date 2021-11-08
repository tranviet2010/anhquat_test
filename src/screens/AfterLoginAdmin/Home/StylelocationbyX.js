import { StyleSheet } from 'react-native';
import { width, COLOR_WHITEGRAY, TEXT_COLOR, COLOR_PRIMARY } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: 10,
		marginHorizontal: width / 20,
		backgroundColor: 'white',
		marginTop: width / 20,
		alignItems: 'center',
		height: width / 7
	},
	text: {
		color: TEXT_COLOR,
		fontSize: textFontSize
	},
	image: {
		width: width / 15,
		height: width / 15,
		resizeMode: 'contain',
		alignSelf: 'center',
		margin: width / 30,
		flex: 1
	},
	inputContainer: {
		backgroundColor: 'white',
		marginHorizontal: width / 20,
		borderRadius: 5,
		height: width / 7,
		alignItems: 'center',
		alignSelf: 'center',
		width: width / 1.1,
		textAlignVertical: 'top'
	},
	inputContainerStyle: {
		borderBottomWidth: 0,
		paddingHorizontal: 10,
		paddingTop: 5,
		textAlignVertical: 'top'
	},
	inputStyle: {
		fontSize: textFontSize * 1.1,
		textAlignVertical: 'top'
	}
});
