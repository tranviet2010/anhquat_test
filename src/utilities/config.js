import { Platform, Dimensions } from 'react-native';
const { height, width, fontScale, scale } = Dimensions.get('window');
import { isIphoneX } from 'react-native-iphone-x-helper';

// const isIphoneX = () => {
// 	const dim = Dimensions.get('window');

// 	return (
// 		// This has to be iOS
// 		Platform.OS === 'ios' &&
// 		// Check either, iPhone X or XR
// 		(isIPhoneXSize(dim) || isIPhoneXrSize(dim))
// 	);
// };

export function isIPhoneXSize(dim) {
	return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim) {
	return dim.height == 896 || dim.width == 896;
}
const HOSPITAL_ID = 'BVANHQUAT';
const ONESIGNAL_APP_ID = '820edf28-ad0a-4cde-9b0d-cbf6e23d3bf2';

const COLOR_BACKGROUND_TEXT_INPUT = '#f1f5f8';
const COLOR_PRIMARY = '#3384c5';
const COLOR_LIGHT_BLUE = '#D2F1F9';
const TEXT_COLOR = '#24324C';
const COLOR_GREEN = '#009887';
const COLOR_ORANGE = '#FD9A26';
const COLOR_GRAY = '#7e8182';
const COLOR_MINT = '#009686';
const COLOR_RED = '#e95942';
const COLOR_WHITEGRAY = '#f4f4f4';
const COLOR_KETCHUP = '#e94125';

const PHONE_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/;
const PASS_REREX = 6;

export {
	ONESIGNAL_APP_ID,
	HOSPITAL_ID,
	height,
	width,
	COLOR_BACKGROUND_TEXT_INPUT,
	COLOR_PRIMARY,
	TEXT_COLOR,
	PHONE_REGEX,
	PASS_REREX,
	isIphoneX,
	COLOR_GREEN,
	COLOR_ORANGE,
	COLOR_LIGHT_BLUE,
	COLOR_GRAY,
	COLOR_MINT,
	COLOR_RED,
	COLOR_WHITEGRAY,
	COLOR_KETCHUP
};
