import AsyncStorage from '@react-native-community/async-storage';

const USER_INFORMATION = 'USER_INFORMATION';
const COUNT_OPEN_APP = 'COUNT_OPEN_APP';
const DEVICE_TOKEN = 'DEVICE_TOKEN';

async function getUserInfo() {
	let user = await AsyncStorage.getItem(USER_INFORMATION);
	// console.log(user)
	if (user) {
		return JSON.parse(user);
	} else {
		return null;
	}
}
async function setUserInfo(user) {
	return await AsyncStorage.setItem(USER_INFORMATION, JSON.stringify(user));
}

async function clearAll() {
	return await AsyncStorage.clear();
}
async function logout() {
	return await AsyncStorage.setItem(USER_INFORMATION, '');
}
async function getCountOpenApp() {
	let count = await AsyncStorage.getItem(COUNT_OPEN_APP);
	if (count) {
		return count;
	} else {
		return 0;
	}
}
async function setCountOpenApp(count) {
	return await AsyncStorage.setItem(COUNT_OPEN_APP, count + '');
}
async function getDeviceToken() {
	let token = await AsyncStorage.getItem(DEVICE_TOKEN);
	if (token) {
		return token;
	} else {
		return null;
	}
}
async function setDeviceToken(token) {
	return await AsyncStorage.setItem(DEVICE_TOKEN, token + '');
}
export default (MAsysncStorage = {
	getDeviceToken,
	setDeviceToken,
	setCountOpenApp,
	getCountOpenApp,
	setUserInfo,
	getUserInfo,
	clearAll,
	logout
});
