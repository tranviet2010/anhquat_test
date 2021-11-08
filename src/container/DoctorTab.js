import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import HomeScreen from '../screens/AfterLoginDoctor/Home/HomeScreen';
import User from '../screens/AfterLoginDoctor/Account/User';
// import VideoCall from '../screens/AfterLoginDoctor/VideoCall';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {textFontSize} from '../utilities/Styles';
import {COLOR_PRIMARY, COLOR_GRAY, width} from '../utilities/config';
const TabNavigator = createMaterialTopTabNavigator();
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
  componentDidMount = async () => {};
  render() {
    return (
      <TabNavigator.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: textFontSize,
            textTransform: 'capitalize',
            margin: 0,
          },
          activeTintColor: COLOR_PRIMARY,
          inactiveTintColor: COLOR_GRAY,
          showIcon: true,
        }}
        tabBarPosition="bottom"
        swipeEnabled={true}>
        <TabNavigator.Screen
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({focused, color}) => (
              <CopilotStep text="Trang chủ" order={1} name="Trang chủ">
                <WalkthroughableImage
                  source={focused ? menu_home_sang : menu_home_toi}
                  style={styles.img}
                />
              </CopilotStep>
            ),
          }}
          name="Trang chủ"
          component={HomeScreen}
        />
        {/* <TabNavigator.Screen
					options={{
						tabBarLabel: 'Video Call',
						tabBarIcon: ({ focused, color }) => (
							<CopilotStep text="Video Call" order={4} name="Video Call">
								<WalkthroughableImage
									source={focused ? menu_acc_sang : menu_acc_toi}
									style={styles.img}
								/>
							</CopilotStep>
						)
					}}
					name="Video Call"
					component={VideoCall}
				/> */}
        <TabNavigator.Screen
          options={{
            tabBarLabel: 'Cá nhân',
            tabBarIcon: ({focused, color}) => (
              <CopilotStep text="Thông tin cá nhân" order={4} name="Cá nhân">
                <WalkthroughableImage
                  source={focused ? menu_acc_sang : menu_acc_toi}
                  style={styles.img}
                />
              </CopilotStep>
            ),
          }}
          name="Cá nhân"
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
    alignSelf: 'center',
  },
  tab: {
    bottom: 0,
    position: 'absolute',
  },
  tooltipStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default copilot({tooltipStyle: styles.tooltipStyle})(Tab);
