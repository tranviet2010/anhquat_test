import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { width, height, COLOR_PRIMARY, ONESIGNAL_APP_ID } from '../../utilities/config';
const logoAQ = require('../../assets/img/logo_start.png');
import codePush from 'react-native-code-push';
import ProgressCircle from 'react-native-progress-circle';
import { ActivityIndicator } from 'react-native-paper';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { CommonActions, StackActions } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { checkTokenAction } from '../../redux/redux/checkToken';
import { connect } from 'react-redux';
import { subcribeAction } from '../../redux/redux/subcribe';

class LogoStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			isUpdating: false
		};
		OneSignal.init(ONESIGNAL_APP_ID, { kOSSettingsKeyAutoPrompt: true });
		OneSignal.inFocusDisplaying(2);
		OneSignal.registerForPushNotifications();
		// Setting enableVibrate
		OneSignal.enableVibrate(true);
		// Setting enableSound
		OneSignal.enableSound(true);

		let permissions = {
			alert: true,
			badge: true,
			sound: true
		};
		OneSignal.requestPermissions(permissions);
		OneSignal.addEventListener('received', this.onReceived);
		OneSignal.addEventListener('opened', this.onOpened);
		OneSignal.addEventListener('ids', this.onIds);
	}
	componentWillUnmount() {
		OneSignal.removeEventListener('received', this.onReceived);
		OneSignal.removeEventListener('opened', this.onOpened);
		OneSignal.removeEventListener('ids', this.onIds);
	}

	onReceived(notification) {
		console.log('Notification received: ', notification);
	}

	onOpened(openResult) {
		console.log('Message: ', openResult.notification.payload.body);
		console.log('Data: ', openResult.notification.payload.additionalData);
		console.log('isActive: ', openResult.notification.isAppInFocus);
		console.log('openResult: ', openResult);
	}

	onIds(device) {
		console.log('Device info: ', device);
		MAsyncStorage.setDeviceToken(device['userId']);
	}

	componentDidMount = async () => {
		this.sync_code_push();
	};
	checkUserInfo = async () => {
		this.props.checkTokenAction();
	};
	sync_code_push() {
		codePush.sync(
			{
				updateDialog: false,
				installMode: codePush.InstallMode.IMMEDIATE
			},
			this.onSyncStatusChange,
			this.onDownloadProgress,
			this.onError
		);
	}
	onDownloadProgress = (downloadProgress) => {
		if (downloadProgress) {
			if (__DEV__)
				console.log('Downloading ' + downloadProgress.receivedBytes + ' of ' + downloadProgress.totalBytes);
			let progress = Math.round(downloadProgress.receivedBytes / downloadProgress.totalBytes * 100);
			if (progress !== this.state.progress) {
				this.setState({ progress: progress });
			}
		}
	};
	onError = function(error) {
		console.log('An error occurred. ' + error);
	};

	onSyncStatusChange = (status) => {
		switch (status) {
			case codePush.SyncStatus.CHECKING_FOR_UPDATE:
				console.log('codepush ', 'Checking for updates.');
				this.checkCodePushFinish();
				this.setState({ isChecking: true });
				break;
			case codePush.SyncStatus.UNKNOWN_ERROR:
				console.log('codepush', 'Error for updates.');
				this.checkCodePushFinish();
				break;
			case codePush.SyncStatus.DOWNLOADING_PACKAGE:
				console.log('codepush', 'Downloading package.');
				this.setState({ isChecking: false, isUpdating: true });
				break;
			case codePush.SyncStatus.INSTALLING_UPDATE:
				console.log('codepush', 'Installing update.');
				this.setState({ isChecking: false });
				break;
			case codePush.SyncStatus.UP_TO_DATE:
				this.setState({ isChecking: false, codepush_finished: true });
				this.checkCodePushFinish();
				console.log('codepush', 'Up-to-date.');
				break;
			case codePush.SyncStatus.UPDATE_INSTALLED:
				this.setState({ isChecking: false });
				this.checkCodePushFinish();
				console.log('codepush', 'Update installed.');
				break;
		}
	};

	async checkCodePushFinish() {
		this.checkUserInfo();
	}
	componentDidUpdate(PrevProps) {
		if (PrevProps.userInfoReducer != this.props.userInfoReducer) {
			if (this.props.userInfoReducer.data.user) {
				this.subcribe();
				this._goMain();
			}
		}
		if (PrevProps.checkTokenReducer != this.props.checkTokenReducer) {
			if (this.props.checkTokenReducer.isError) {
				this._goLogin();
			}
		}
	}
	subcribe = async () => {
		// let deviceId = DeviceInfo.getDeviceId();
		// console.log(deviceId)
		let token = await MAsyncStorage.getDeviceToken();
		let body = {
			token,
			app_version: DeviceInfo.getVersion(),
			os: Platform.OS
		};
		this.props.subcribeAction(body);
	};
	_goLogin = async () => {
		const count = await MAsyncStorage.getCountOpenApp();
		MAsyncStorage.setCountOpenApp(parseInt(count) + 1);
		if (count == 0) {
			this.props.navigation.navigate('StartScreen');
		} else {
			this.props.navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [ { name: 'SigninStack' } ]
				})
			);
		}
	};
	_goMain = async () => {
		const count = await MAsyncStorage.getCountOpenApp();
		MAsyncStorage.setCountOpenApp(parseInt(count) + 1);
		this.props.navigation.dispatch(
			CommonActions.reset({
				index: 1,
				routes: [
					{
						name:
							this.props.userInfoReducer.data.user.type == 'user'
								? 'AfterLoginStack'
								: this.props.userInfoReducer.data.user.type == 'doctor'
									? 'AfterLoginDoctorStack'
									: 'AfterLoginAdminStack'
					}
				]
			})
		);
	};
	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={logoAQ} />
				<Text style={styles.cpname}>BỆNH VIỆN ĐA KHOA ANH QUẤT</Text>
				<Text style={styles.slogan}>Tận tình - Chu đáo - Chất lượng - Hiện đại</Text>
				{this.state.isUpdating ? (
					<View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
						<ProgressCircle
							percent={this.state.progress}
							radius={50}
							borderWidth={10}
							color={COLOR_PRIMARY}
							shadowColor="#fff"
							bgColor="#fff"
						>
							<Text style={{ fontSize: 18 }}>{this.state.progress + '%'}</Text>
						</ProgressCircle>
						<Text
							style={{
								fontSize: 18,
								textAlign: 'center',
								margin: 10,
								color: COLOR_PRIMARY
							}}
						>
							{'Có một bản cập nhật mới...'}
						</Text>
					</View>
				) : (
					<ActivityIndicator style={{ marginTop: 50 }} size="large" color={COLOR_PRIMARY} />
				)}
			</View>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer,
		subcribeReducer: state.subcribeReducer,
		checkTokenReducer: state.checkTokenReducer
	};
};

export default connect(mapStateToProps, { checkTokenAction, subcribeAction })(LogoStart);

const styles = StyleSheet.create({
	container: {
		flex: 0.7,
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 20
	},
	logo: {
		width: width / 1.8,
		height: height / 4,
		resizeMode: 'contain'
	},
	cpname: {
		color: 'red',
		fontWeight: 'bold',
		marginTop: 35,
		fontSize: 15
	},
	slogan: {
		color: '#4da6ff',
		marginTop: 10
	}
});
