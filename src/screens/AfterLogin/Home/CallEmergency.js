import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import MView from '../../../components/MView';
import { width, TEXT_COLOR, COLOR_KETCHUP } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import NButton from '../../../components/NButton';
import IonIcon from 'react-native-vector-icons/Ionicons';
const nen = require('../../../assets/img/img_homescreen/goi_cap_cuu.png');
import RNLocation from 'react-native-location';
import { connect } from 'react-redux';
import { CapCuuItem } from '../../../components/customize/MeetingItem';

class CallEmergency extends Component {
	componentDidMount() {
		RNLocation.requestPermission({
			ios: 'always', // or 'always'
			android: {
				detail: 'fine', // or 'fine'
				rationale: {
					title: 'We need to access your location',
					message: 'We use your location to show where you are on the map',
					buttonPositive: 'OK',
					buttonNegative: 'Cancel'
				}
			}
		});
	}
	render() {
		return (
			<MView>
				<ScrollView>
					<ImageBackground source={nen} style={styles.image}>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.pop();
							}}
							style={{ marginLeft: 10, marginTop: 50, width: width / 3 }}
						>
							<IonIcon
								name="chevron-back-outline"
								style={{
									color: 'white',
									fontSize: textFontSize + 20
								}}
							/>
						</TouchableOpacity>

						<Text style={styles.title}>Cấp cứu khẩn cấp</Text>
						<Text style={styles.title}>TẠI CHỖ</Text>
					</ImageBackground>
					<View style={{ marginVertical: width / 10, marginHorizontal: width / 20 }}>
						<Text style={[ styles.text, { fontWeight: 'bold', fontSize: textFontSize * 1.5 } ]}>
							Giữ liên lạc và kết nối
						</Text>
						<Text style={styles.text}>
							Nếu bạn gặp sự cố không thể đến bệnh viện hãy bấm nút CẤP CỨU. Chúng tôi sẽ liên lạc và tới
							trợ giúp bạn
						</Text>
					</View>
					{this.props.userInfoReducer.data.cap_cuu.length > 0 ? (
						this.props.userInfoReducer.data.cap_cuu.map((value, index) => (
							<View key={index + ''} style={{ width: width, paddingHorizontal: 10, flex: 1 }}>
								<CapCuuItem
									item={value}
									onPress={() => this.props.navigation.navigate('CapCuuDetail', { data: value })}
								/>
							</View>
						))
					) : (
						<NButton
							text="GỌI CẤP CỨU"
							style={{ marginTop: width / 20 }}
							onPress={() => this.props.navigation.navigate('ChooseLocation')}
							bgCl={COLOR_KETCHUP}
						/>
					)}
				</ScrollView>
			</MView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer
	};
};

export default connect(mapStateToProps, {})(CallEmergency);
const styles = StyleSheet.create({
	image: {
		height: width / 1.4,
		flexDirection: 'column'
	},
	title: {
		textAlign: 'center',
		alignItems: 'flex-end',
		color: 'white',
		fontSize: textFontSize * 1.5,
		fontWeight: 'bold',
		top: width / 20
	},
	text: {
		color: TEXT_COLOR,
		fontSize: textFontSize,
		marginBottom: 5
	}
});
