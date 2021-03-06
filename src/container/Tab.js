import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/AfterLogin/Home/HomeScreen';
import MeetingCalendar from '../screens/AfterLogin/Meetings/MeetingCalendar';
import QuestionAnswer from '../screens/AfterLogin/QA/QuestionAnswer';
import User from '../screens/AfterLogin/Account/User';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { textFontSize } from '../utilities/Styles';
import { COLOR_PRIMARY, COLOR_GRAY, width } from '../utilities/config';
import MAsyncStorage from '../utilities/MAsyncStorage';
import { connect } from 'react-redux';
import { isIphoneX } from 'react-native-iphone-x-helper';

const TabNavigator = createBottomTabNavigator();
const menu_home_sang = require('../assets/img/img_homescreen/menu_home_sang.png');
const menu_home_toi = require('../assets/img/img_homescreen/menu_home_toi.png');
const menu_dat_lich_hen_sang = require('../assets/img/img_meetings/menu_dat_lich_hen_sang.png');
const menu_dat_lich_hen_toi = require('../assets/img/img_meetings/menu_dat_lich_hen_toi.png');
const menu_tu_van_sang = require('../assets/img/img_qa/menu_tu_van_sang.png');
const menu_tu_van_toi = require('../assets/img/img_qa/menu_tu_van_toi.png');
const menu_acc_sang = require('../assets/img/img_account/menu_acc_sang.png');
const menu_acc_toi = require('../assets/img/img_account/menu_acc_toi.png');

const CopilotText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
let guide = false;
class Tab extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount = async () => {
		let count_open_app = await MAsyncStorage.getCountOpenApp();
		if (parseInt(count_open_app) <= 2) {
			// this.props.start();
		}
	};
	render() {
		return (
			<TabNavigator.Navigator
				tabBarOptions={{
					labelStyle: {
						fontSize: textFontSize,
						textTransform: 'capitalize',
						margin: 0
					},
					activeTintColor: COLOR_PRIMARY,
					inactiveTintColor: COLOR_GRAY,
					showIcon: true,
					style: {
						height: isIphoneX() ? 90 : 65
					},
					tabStyle: {
						justifyContent: 'center',
						alignItems: 'center',
						padding: 5
					}
				}}
				lazy={false}
				tabBarPosition="bottom"
				swipeEnabled={true}
				safeAreaInsets="bottom"
			>
				<TabNavigator.Screen
					options={{
						tabBarLabel: 'Trang ch???',
						tabBarIcon: ({ focused, color }) => (
							<CopilotStep text="Trang ch???" order={1} name="Trang ch???">
								<WalkthroughableImage
									source={focused ? menu_home_sang : menu_home_toi}
									style={styles.img}
								/>
							</CopilotStep>
						)
					}}
					name="Trang ch???"
					component={HomeScreen}
				/>
				<TabNavigator.Screen
					options={{
						tabBarLabel: 'L???ch h???n',
						tabBarIcon: ({ focused, color }) => (
							<CopilotStep text="?????t v?? ki???m tra l???ch h???n" order={2} name="L???ch h???n">
								<WalkthroughableImage
									source={focused ? menu_dat_lich_hen_sang : menu_dat_lich_hen_toi}
									style={styles.img}
								/>
							</CopilotStep>
						)
					}}
					name="L???ch h???n"
					component={MeetingCalendar}
				/>
				<TabNavigator.Screen
					options={{
						tabBarLabel: 'H???i ????p',
						tabBarIcon: ({ focused, color }) => (
							<CopilotStep text="H???i ????p tr???c tuy???n v???i b??c s??" order={3} name="H???i ????p">
								<WalkthroughableImage
									source={focused ? menu_tu_van_sang : menu_tu_van_toi}
									style={styles.img}
								/>
							</CopilotStep>
						)
					}}
					name="H???i ????p"
					component={QuestionAnswer}
				/>
				<TabNavigator.Screen
					options={{
						tabBarLabel: 'C?? nh??n',
						tabBarIcon: ({ focused, color }) => (
							<CopilotStep text="Th??ng tin c?? nh??n" order={4} name="C?? nh??n">
								<WalkthroughableImage
									source={focused ? menu_acc_sang : menu_acc_toi}
									style={styles.img}
								/>
							</CopilotStep>
						)
					}}
					name="C?? nh??n"
					component={User}
				/>
			</TabNavigator.Navigator>
		);
	}
}
const styles = StyleSheet.create({
	img: {
		height: width / 17,
		width: width / 17,
		alignSelf: 'center'
	},
	tab: {
		bottom: 0,
		position: 'absolute'
	},
	tooltipStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});
export default copilot({ tooltipStyle: styles.tooltipStyle })(Tab);
