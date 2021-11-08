import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import MView from '../../components/MView';
import { width, COLOR_PRIMARY, TEXT_COLOR } from '../../utilities/config';
import { textFontSize } from '../../utilities/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, StackActions } from '@react-navigation/native';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { connect } from 'react-redux';

const nen = require('../../assets/img/hoan_thanh.png');

class RegisterSuccess extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	subcribe = async () => {
		const token = await MAsyncStorage.getDeviceToken();
		let body = {
			token,
			app_version: DeviceInfo.getVersion,
			os: Platform.OS
		};
		this.props.subcribeAction(body);
	};
	go_main = () => {
		// this.subcribe();
		this.props.navigation.navigate('SigninScreen', {
			user_code: this.props.userInfoReducer.data.user.user_code,
			password: this.props.route.params.password
		});
		// this.props.navigation.dispatch(
		// 	CommonActions.reset({
		// 		index: 1,
		// 		routes: [ { name: 'SigninScreen' } ]
		// 	})
		// );
	};
	render() {
		return (
			<MView style={{ backgroundColor: 'white' }}>
				<ImageBackground source={nen} style={styles.image}>
					<View style={{ position: 'absolute', right: 5, top: width / 4, width: width / 2.2 }}>
						<Text style={[ styles.title, { fontWeight: 'bold' } ]}>WELCOME</Text>
						<Text style={[ styles.title, { fontSize: textFontSize * 1.1 } ]}>
							Chúc mừng bạn đã đăng ký tài khoản thành công với mã {'\n'}
							<Text style={[ styles.title, { fontSize: textFontSize * 1.5, fontWeight: 'bold' } ]}>
								{this.props.userInfoReducer.data.user.user_code}
							</Text>
						</Text>
					</View>
				</ImageBackground>
				<Text style={styles.text}>
					Luôn cập nhật thông tin cá nhân để {'\n'}chúng tôi phục vụ bạn được tốt nhất
				</Text>
				<TouchableOpacity onPress={this.go_main} style={styles.btnstart}>
					<Text style={[ styles.text, { color: 'white', fontWeight: 'bold' } ]}>ĐĂNG NHẬP</Text>
				</TouchableOpacity>
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer
	};
};

export default connect(mapStateToProps)(RegisterSuccess);
const styles = StyleSheet.create({
	image: {
		//flex: 0.5,
		height: width,
		flexDirection: 'column',
		justifyContent: 'center'
		//paddingBottom: height/10
	},
	title: {
		textAlign: 'center',
		alignItems: 'flex-end',
		color: 'white',
		fontSize: textFontSize * 2

		//marginBottom: 10
	},
	text: {
		color: '#c3c3c5',
		marginHorizontal: width / 20,
		marginVertical: width / 20
	},
	btnstart: {
		backgroundColor: COLOR_PRIMARY,
		marginHorizontal: width / 20,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: width / 20
	}
});
