const styles = StyleSheet.create({
	headerImg: {
		width: width,
		flex: 1,
		resizeMode: 'stretch',
		marginBottom: 20,
		justifyContent: 'space-between'
	},
	create_1: {
		position: 'absolute',
		width: width / 4,
		justifyContent: 'center',
		backgroundColor: '#fd9a26',
		padding: 10,
		marginLeft: 10,
		borderRadius: 40,
		bottom: 0
	},
	create_2: {
		width: '90%',
		marginRight: 5,
		justifyContent: 'center',
		backgroundColor: '#fd9a26',
		padding: 10,
		marginLeft: 10,
		borderRadius: 40
	},
	newsList: {
		flex: 1,
		margin: width / 30
	},
	newsItem: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		marginHorizontal: 4,
		backgroundColor: 'white',
		marginBottom: height / 50,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3
	},
	img: {
		flex: 1,
		width: width / 10,
		height: undefined,
		resizeMode: 'contain'
	}
});
import { connect } from 'react-redux';

import React, { Component, PureComponent } from 'react';
import {
	View,
	Text,
	ScrollView,
	ImageBackground,
	Dimensions,
	StatusBar,
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Platform,
	AppState,
	Image,
	Animated
} from 'react-native';

import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper';
import MView from '../../../components/MView';
import { width, height, COLOR_PRIMARY } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Badge } from 'react-native-elements';
import { getUserInfoAction } from '../../../redux/redux/getUserInfo';

const PARALLAX_HEADER_HEIGHT = 300;
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAlert: false,
			loading: true,
			showModal: false
		};

		// this.ws = new WS();
	}
	componentDidUpdate(PrevProps) {
		if (this.props.userInfoReducer != PrevProps.userInfoReducer) {
			if (this.props.userInfoReducer.data && this.props.userInfoReducer.data.chats >= 1) {
				console.log(this.props.userInfoReducer.data.chats);
				this.props.navigation.setOptions({
					tabBarBadge: this.props.userInfoReducer.data.chats
				});
			} else {
				this.props.navigation.setOptions({
					tabBarBadge: null
				});
			}
		}
	}
	componentDidMount() {
		this.focusListener = this.props.navigation.addListener('focus', () => {
			this.props.getUserInfoAction();
		});
	}
	createNew = () => {
		return (
			<View style={{ width: Dimensions.get('window').width }}>
				<ImageBackground
					source={require('../../../assets/img/img_qa/tu_van.png')}
					style={{ width: Dimensions.get('window').width, height: width }}
				/>
				<Text
					style={{
						color: 'white',
						fontSize: textFontSize * 1.8,
						fontWeight: 'bold',
						position: 'absolute',
						top: 50,
						left: 30,
						textAlign: 'center'
					}}
				>
					Tư vấn {'\n'}Hỏi đáp
				</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 50 }}>
					<TouchableOpacity
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							backgroundColor: COLOR_PRIMARY,
							flex: 1,
							height: 70,
							borderRadius: 5,
							paddingHorizontal: 20
						}}
						onPress={() => {
							this.props.navigation.navigate('ChatBox');
						}}
					>
						<FontAwesome5Pro name="comments" size={30} color="white" light />
						<View>
							<Text
								style={{
									color: 'white',
									fontSize: textFontSize + 3,
									fontWeight: 'bold',
									textAlign: 'center',
									marginBottom: 5
								}}
							>
								Nhắn tin với bệnh viện
							</Text>
							<Text
								style={{
									color: 'white',
									fontSize: textFontSize - 2,
									textAlign: 'center',
									marginHorizontal: 20
								}}
							>
								Bạn cần tư vấn về bệnh tình, thuốc uống,... hãy nhắn với bệnh viện Anh Quất tại đây
							</Text>
						</View>

						{this.props.userInfoReducer.data.chats >= 1 ? (
							<Badge
								value={this.props.userInfoReducer.data.chats}
								status="error"
								containerStyle={{ position: 'absolute', top: 4, right: 4 }}
								badgeStyle={{ width: 18, height: 18, borderRadius: 30 }}
								textStyle={{ fontSize: textFontSize }}
							/>
						) : (
							<View />
						)}
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	newsItems = () => {
		const data = newsData;
		return (
			<View style={{ flex: 1, paddingHorizontal: 10, marginTop: 20 }}>
				{data.map((item) => (
					<View key={item.id} style={styles.newsItem}>
						<Image style={styles.img} source={item.image} />
						<View
							style={{
								flex: 6,
								justifyContent: 'center',
								margin: 10
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: textFontSize * 1.1 }}>{item.title}</Text>
							<View
								style={{
									flex: 1,
									marginTop: height / 80,
									flexDirection: 'row'
								}}
							>
								<Text
									style={{
										fontSize: textFontSize * 0.9,
										color: '#626363'
									}}
								>
									{item.content}
								</Text>
								<Text
									style={{
										position: 'absolute',
										right: -5,
										top: 2,
										fontSize: textFontSize * 0.8,
										color: '#aaaaaa'
									}}
								>
									{item.date}
								</Text>
							</View>
						</View>
					</View>
				))}
			</View>
		);
	};

	render() {
		const { onScroll = () => {} } = this.props;

		return (
			<MView style={{ backgroundColor: 'white' }}>
				<StatusBar barStyle="light-content" />
				{/* <ParallaxScrollView
					backgroundColor="#fff"
					// onScroll={Animated.event([ { nativeEvent: { contentOffset: { y: this.state.scrollY } } } ], {
					// 	useNativeDriver: false
					// })}
					//headerBackgroundColor="#000"
					backgroundColor="#fff"
					stickyHeaderHeight={Platform.OS == 'android' ? 70 : isIphoneX() ? 75 : 62}
					parallaxHeaderHeight={300}
					backgroundSpeed={10}
					renderForeground={() => (
						<TouchableOpacity style={styles.create_1}>
							<Text
								onPress={() => this.props.navigation.navigate('ChatBox')}
								style={{
									color: 'white',
									textAlign: 'center',
									fontWeight: 'bold',
									fontSize: textFontSize * 1.1
								}}
							>
								Tạo mới
							</Text>
						</TouchableOpacity>
					)}
					renderFixedHeader={() => {
						return (
							<View>
								<Text style={{ color: '#000' }}>Back</Text>
							</View>
						);
					}}
					renderStickyHeader={() => (
						<View
							style={{
								height: Platform.OS == 'android' ? 80 : isIphoneX() ? 85 : 80,
								flexDirection: 'row',
								borderBottomWidth: 0.5,
								borderBottomColor: '#eee',
								width: width,
								alignItems: 'center',
								backgroundColor: COLOR_PRIMARY
							}}
						>
							<View style={{ flex: 1 }} />
							<View style={{ flex: 2 }}>
								<Text
									style={{
										textAlign: 'center',
										fontSize: 16,
										fontWeight: 'bold',
										color: 'white'
									}}
								>
									Tư vấn và hỏi đáp
								</Text>
							</View>

							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
								<TouchableOpacity style={styles.create_2}>
									<Text
										onPress={() => this.props.navigation.navigate('ChatBox')}
										style={{
											color: 'white',
											textAlign: 'center',
											fontWeight: 'bold',
											fontSize: textFontSize * 1.1
										}}
									>
										Tạo mới
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
					renderBackground={this.createNew}
				>
					{this.newsItems()}
				</ParallaxScrollView> */}
				{this.createNew()}
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer
	};
};

export default connect(mapStateToProps, { getUserInfoAction })(Home);
