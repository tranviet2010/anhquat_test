import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { width, isIphoneX, COLOR_PRIMARY } from '../../utilities/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textFontSize } from '../../utilities/Styles';
import MView from '../../components/MView';
import { NButton2, NButtonGoBack } from '../../components/NButton';
const verify = require('../../assets/img/huong_dan_lay_mxt.png');

export default class VerifyGuide extends Component {
	render() {
		return (
			<MView style={styles.container}>
				<ImageBackground style={styles.imgBackground} source={verify}>
					<NButtonGoBack {...this.props} />
					<Text style={styles.title}>Xác thực số điện thoại</Text>
					<View style={styles.rightText}>
						<Text style={styles.text}>
							Bạn cần nhắn tin theo cú pháp dưới {'\n'}
							đây để xác thực số điện thoại
						</Text>
					</View>
					<View style={styles.syntax}>
						<Text style={[ styles.text, { fontSize: textFontSize * 1.5, fontWeight: 'bold' } ]}>XTAQ</Text>
						<Text style={styles.text}>gửi</Text>
						<Text style={[ styles.text, { fontSize: textFontSize * 1.5, fontWeight: 'bold' } ]}>8279</Text>
					</View>
					<View style={[ styles.syntax, { top: width / 1.8, right: 5 } ]}>
						<Text style={styles.text}>Cước phí 2000đ/sms </Text>
					</View>
				</ImageBackground>
				<NButton2
					onPress={() => {
						this.props.navigation.navigate('InputVerifyCode');
					}}
					text={'NHẬP MÃ XÁC THỰC'}
					style={styles.button}
				/>
			</MView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	imgBackground: {
		width: width,
		height: width * 1.2,
		paddingHorizontal: width / 20,
		padding: width / 20,
		alignItems: 'center'
	},
	title: {
		color: 'white',
		fontSize: textFontSize * 1.6,
		marginTop: 20,
		fontWeight: "bold"
	},
	rightText: {
		position: 'absolute',
		right: 10,
		top: width / 5
	},
	text: {
		color: 'white',
		fontSize: textFontSize * 0.9,
		marginVertical: 3
	},
	syntax: {
		top: width / 3.2,
		right: width / 9,
		alignItems: 'center',
		position: 'absolute'
	},
	button: {
		backgroundColor: COLOR_PRIMARY,
		marginHorizontal: width / 20,
		borderRadius: 5,
		marginBottom: 5,
		alignItems: 'center',
		padding: 10,
		marginTop: width / 10
	}
});
