import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ImageBackground, Image,StyleSheet } from 'react-native';
import {
	height,
	width,
	TEXT_COLOR,
	COLOR_PRIMARY,
	isIphoneX,
	COLOR_GREEN,
	COLOR_ORANGE,
	COLOR_LIGHT_BLUE,
	COLOR_MINT
} from '../../../utilities/config';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textFontSize } from '../../../utilities/Styles';
import { Badge, Avatar } from 'react-native-elements';
import MView from '../../../components/MView';
import { add_dot_number } from '../../../utilities/StringHelper';
import OneLine, { OneLineColumn } from '../../../components/OneLine';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import MeetingItem from '../../../components/customize/MeetingItem';
import { connect } from 'react-redux';
import MAsyncStorage from '../../../utilities/MAsyncStorage';
import { getUserInfoAction } from '../../../redux/redux/getUserInfo';
import MHeader from '../../../components/MHeader';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meetingtitlecolor: '',
			data: null,
			notification: null
		};
	}

	componentDidMount = () => {
		// this.props.getUserInfoAction();
	};

	componentDidUpdate = (PrevProps, PrevState) => {
		
	};
	
	view_main = ()=>{
		return (
			<View style={{flex:1}}>
				<Text
						style={{
							fontSize: textFontSize +2,
							marginVertical: 3,
							textAlign:'center',
							fontWeight:'bold',
							color:COLOR_GREEN
						}}
					>
						Lịch sử gọi điện của bác sĩ
					</Text>
					<FlatList ListFooterComponent={<View><Text style={{
							fontSize: textFontSize,
							marginVertical: 3,
							textAlign:'center',
							marginTop:200
						}}>
						Bác sĩ chưa thực hiện cuộc gọi nào
						</Text></View>} data={[]} renderItem={({item,index})=>{
						return (
							<View style={{}}></View>
						)
					}}>

					</FlatList>
			</View>
		)
	}
	render() {
		return (
			<MView>
	 <MHeader
          text="Lịch sử cuộc gọi"
          onPress={() => {
            this.props.navigation.pop();
          }}
        />				
		{/* {this.view_main()} */}
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer,
		createAppointmentReducer: state.createAppointmentReducer
	};
};
export default connect(mapStateToProps, { getUserInfoAction })(HomeScreen);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageBackground: {
		flex: 1,
		width: width,
		height: height / 4,
		flexDirection: 'column-reverse'
	},
	header: {
		width: width,
		height: isIphoneX() ? width / 2 : width / 3,
		paddingHorizontal: 20
	},
	money: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		height: width / 4,
		width: width / 1.12,
		marginTop: -height / 25,
		borderRadius: 10
	},
	option: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: height / 50
	},
	card: {
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		marginHorizontal: 4,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3
	},
	cardImg: {
		height: width / 6,
		width: width / 9,
		alignSelf: 'center',
		resizeMode: 'contain'
	},
	cardText: {
		fontSize: (width + height) / 100,
		textAlign: 'center',
		justifyContent: 'center',
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 5
	},
	appointment: {
		width: width,
		flexDirection: 'column',
		marginTop: height / 25,
		alignSelf: 'center'
	},
	meetingReminder: {
		paddingVertical: 10,
		paddingLeft: 15,
		width: width * 0.92,
		minHeight: width * 0.3,
		marginHorizontal: 4,
		backgroundColor: 'white',
		marginBottom: 20,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	imgContainer: {
		flex: 1,
		height: width / 3,
		top: -width / 3.5
	},
	img: {
		width: width / 2.2,
		resizeMode: 'contain'
	},
	makeappt: {
		marginTop: 10,
		padding: 10,
		backgroundColor: COLOR_PRIMARY,
		width: width / 3,
		borderRadius: 5,
		alignItems: 'center'
	}
});
