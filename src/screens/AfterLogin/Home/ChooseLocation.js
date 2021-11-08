import React, { Component } from 'react';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { width, COLOR_WHITEGRAY, TEXT_COLOR, COLOR_PRIMARY } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
const arrow = require('../../../assets/img/img_homescreen/location.png');
const placeholder = require('../../../assets/img/location.png');
const file = require('../../../assets/img/img_homescreen/dd_theo_ho_so.png');
import RNLocation from 'react-native-location';
import MAlert from '../../../components/MAlert';
import { ActivityIndicator } from 'react-native-paper';

export default class ChooseLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_getting_my_location: true,
			my_address: '',
			my_location: null
		};
		RNLocation.requestPermission({
			ios: 'always', // or 'always'
			android: {
				detail: 'fine', // or 'fine'
				rationale: {
					title: 'Yêu cầu quyền vị trí',
					message: 'Chúng tôi cần truy cập vị trí của bạn',
					buttonPositive: 'Đồng ý',
					buttonNegative: 'Từ chối'
				}
			}
		});
	}

	getLocation = (lat, long) => {
		fetch(
			'https://test-livraison.yobuma.com/yobuma_api/getAddressFromLocationAnhQuat?latitude=' +
				lat +
				'&' +
				'longitude=' +
				long,
			// "https://reactnative.dev/movies.json",
			{
				method: 'GET'
			}
		)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				this.setState({ my_address: result.data.address, is_getting_my_location: false });
			})
			.then((err) => {
				if (err) {
					console.log(err);
				}
			});
	};
	componentDidMount = async () => {
		let location = await this.getCurrentLocation();
		if (location) {
			this.getLocation(location.latitude, location.longitude);
			console.log(location);
			this.setState({ my_location: location });
		} else {
			this.setState({ is_getting_my_location: false });

			// this.malert.showAlert(
			// 	"Không thể lấy được vị trí hiện tại. Đảm bảo bạn đã mở GPS và cho phép ứng dụng truy cập vị trí",
			// 	() => {
			// 		Linking.openSettings();
			// 	},
			// 	() => {}
			// );
		}
	};
	getCurrentLocation = () => {
		return new Promise(async (resolve) => {
			var permission = await RNLocation.getCurrentPermission();
			if (permission.includes('authorized')) {
				RNLocation.getLatestLocation({ timeout: 10000 })
					.then((latestLocation) => {
						console.log(latestLocation);
						console.log('latestLocation');
						var body = {
							longitude: latestLocation.longitude,
							latitude: latestLocation.latitude
						};
						resolve(body);
					})
					.catch((error) => {
						resolve(null);
					});
			} else {
				resolve(null);
				this.malert.showAlert(
					'Không thể lấy được vị trí hiện tại. Đảm bảo bạn đã mở GPS và cho phép ứng dụng truy cập vị trí',
					() => {
						Linking.openSettings();
					},
					() => {}
				);
			}
		});
	};
	locationItem = (icon, title, content, directo) => {
		return (
			<TouchableOpacity
				onPress={() =>
					this.props.navigation.navigate('LocationbyMap', {
						my_location: this.state.my_location
					})}
				elevation={2}
				style={styles.container}
			>
				<Image style={styles.image} source={icon} />
				<View style={{ flex: 9 }}>
					<Text style={[ styles.text, { fontWeight: 'bold', fontSize: textFontSize * 1.1 } ]}>{title}</Text>
					{content ? <Text style={[ styles.text, { color: '#c3c3c3' } ]}>{content}</Text> : <View />}
				</View>
			</TouchableOpacity>
		);
	};
	myLocationItem = (icon, title, content) => {
		return (
			<TouchableOpacity
				onPress={() => {
					if (this.state.my_location) {
						this.props.navigation.navigate('LocationbyPhone', {
							my_location: this.state.my_location,
							my_address: this.state.my_address
						});
					}
				}}
				elevation={2}
				style={styles.container}
			>
				<Image style={styles.image} source={icon} />
				<View style={{ flex: 9 }}>
					<Text style={[ styles.text, { fontWeight: 'bold', fontSize: textFontSize * 1.1 } ]}>{title}</Text>
					{content ? <Text style={[ styles.text, { color: '#c3c3c3' } ]}>{content}</Text> : <View />}
				</View>
				{this.state.is_getting_my_location && <ActivityIndicator size="small" color={COLOR_PRIMARY} />}
			</TouchableOpacity>
		);
	};
	render() {
		return (
			<MView style={{ backgroundColor: 'white' }}>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Bạn ở đâu"
				/>
				{this.myLocationItem(arrow, 'Theo vị trí của điện thoại', this.state.my_address)}
				{this.locationItem(placeholder, 'Nhập hoặc chọn vị trí trên bản đồ', null, 'LocationbyMap')}
				{/* {this.locationItem(
					file,
					'Theo địa chỉ đăng ký thành viên',
					'Số 10, Hoàng Hoa Thám, Cao Thượng, Tân Yên, Bắc Giang',
					'LocationbyRegister'
				)} */}
				<MAlert ref={(ref) => (this.malert = ref)} />
			</MView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: 10,
		marginHorizontal: width / 20,
		backgroundColor: COLOR_WHITEGRAY,
		marginTop: width / 20,
		padding: 5,
		alignItems: 'center',
		height: width / 5
	},
	text: {
		fontSize: textFontSize,
		color: TEXT_COLOR
	},
	image: {
		width: width / 15,
		height: width / 15,
		resizeMode: 'contain',
		alignSelf: 'center',
		margin: width / 30,
		flex: 1
	}
});
