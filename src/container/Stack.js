import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../screens/Start/StartScreen';
import SigninScreen from '../screens/Start/SigninScreen';
import SignupScreen from '../screens/Start/SignupScreen';
import Tab from './Tab';
import DoctorTab from './DoctorTab';

import CreateNewChatBox from '../screens/AfterLogin/QA/CreateNewChatBox';
import FamilyDetail from '../screens/AfterLogin/Account/FamilyDetail';
import AddNewDocument from '../screens/AfterLogin/Account/AddNewDocument';
import PatientInformation from '../screens/AfterLogin/Account/PatientInformation';
import InsuranceInformation from '../screens/AfterLogin/Account/InsuranceInformation';
import AddHealthInsurance from '../screens/AfterLogin/Account/AddHealthInsurance';
import AddPrivateInsurance from '../screens/AfterLogin/Account/AddPrivateInsurance';
import SignupOption from '../screens/Start/SignupOption';
import UserInformation from '../screens/Start/UserInformation';
import RegisterSuccess from '../screens/Start/RegisterSuccess';
import MeetingCalendar from '../screens/AfterLogin/Meetings/MeetingCalendar';
import VerifyGuide from '../screens/Start/VerifyGuide';
import InputVerifyCode from '../screens/Start/InputVerifyCode';
import Wallet from '../screens/AfterLogin/Home/Wallet';
import ExamineHistory from '../screens/AfterLogin/Home/ExamineHistory';
import CallEmergency from '../screens/AfterLogin/Home/CallEmergency';
import ChooseLocation from '../screens/AfterLogin/Home/ChooseLocation';
import LocationbyPhone from '../screens/AfterLogin/Home/LocationbyPhone';
import LocationbyMap from '../screens/AfterLogin/Home/LocationbyMap';
import PinonMap from '../screens/AfterLogin/Home/PinonMap';
import LocationbyRegister from '../screens/AfterLogin/Home/LocationbyRegister';
import ResultDetail from '../screens/AfterLogin/Home/ResultDetail';
import MakeAppointment from '../screens/AfterLogin/Meetings/MakeAppointment';
import LogoStart from '../screens/Start/LogoStart';
import ConfirmInformation from '../screens/AfterLogin/Meetings/ConfirmInformation';
import InputAddress from '../screens/AfterLogin/Account/InputAddress';
import AddHistory from '../screens/AfterLogin/Home/AddHistory';
import Notification from '../screens/AfterLogin/Home/Notification';
import NotificationDetail from '../screens/AfterLogin/Home/NotificationDetail';
import DetailAppointment from '../screens/AfterLogin/Meetings/DetailAppointment';
import DoctorList from '../screens/AfterLogin/QA/DoctorList';

import CapCuuDetail from '../screens/AfterLogin/Home/CapCuuDetail';
import CallHistory from '../screens/AfterLoginDoctor/CallHistory';
// import CallScreen from '../screens/AfterLoginDoctor/CallScreen';
import CLSDetail from '../screens/AfterLogin/Home/CLSDetail';
import Policy from '../screens/Start/Policy';
import ImageHistoryDetail from '../screens/AfterLogin/Home/ImageHistoryDetail';
import EditUserInfomation from '../screens/AfterLogin/Account/EditUserInfomation';
import EditIdentityInfomation from '../screens/AfterLogin/Account/EditIdentityInfomation';
import EditBHYT from '../screens/AfterLogin/Account/_EditBHYT';
import HeathyInfomation from '../screens/AfterLogin/Account/HeathyInfomation';
import EditHeathyInfomation from '../screens/AfterLogin/Account/EditHeathyInfomation';
import EditAddressInfomation from '../screens/AfterLogin/Account/EditAddressInfomation';
import SelectDanToc from '../screens/AfterLogin/Account/SelectDanToc';
import SelectNgheNghiep from '../screens/AfterLogin/Account/SelectNgheNghiep';
import DetailKhaiBaoYTe from '../screens/AfterLogin/Meetings/DetailKhaiBaoYTe';
import EditKhaiBaoYTe from '../screens/AfterLogin/Meetings/EditKhaiBaoYTe';
import Support from '../screens/AfterLogin/Account/Support';
import AdminTab from './AdminTab';
const StartStack = createStackNavigator();
const SigninStack = createStackNavigator();
const SignupStack = createStackNavigator();

const BeforeLoginStack = createStackNavigator();
const MainStack = createStackNavigator();
const AfterLoginStack = createStackNavigator();
const AfterLoginDoctorStack = createStackNavigator();
const AfterLoginAdminStack = createStackNavigator();

export const Main = () => (
  <NavigationContainer>
    <MainStack.Navigator initialRouteName="StartStack" headerMode="none">
      <MainStack.Screen
        name="AfterLoginAdminStack"
        component={AfterLoginAdmin}
      />
      <MainStack.Screen
        name="AfterLoginDoctorStack"
        component={AfterLoginDoctor}
      />
      <MainStack.Screen name="AfterLoginStack" component={AfterLogin} />
      <MainStack.Screen name="SigninStack" component={Signin} />
      <MainStack.Screen name="SignupStack" component={Signup} />

      <MainStack.Screen name="StartStack" component={Start} />
    </MainStack.Navigator>
  </NavigationContainer>
);

function Start() {
  return (
    <StartStack.Navigator
      initialRouteName="LogoStart"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <StartStack.Screen
        name="LogoStart"
        component={LogoStart}
        options={{
          header: () => null,
        }}
      />
      <StartStack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          header: () => null,
        }}
      />
    </StartStack.Navigator>
  );
}

function Signin() {
  return (
    <SigninStack.Navigator
      initialRouteName="SigninScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SigninStack.Screen
        name="SigninScreen"
        component={SigninScreen}
        options={{
          header: () => null,
        }}
      />
    </SigninStack.Navigator>
  );
}

function Signup() {
  return (
    <SignupStack.Navigator
      initialRouteName="SignupOption"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SignupStack.Screen
        name="SignupOption"
        component={SignupOption}
        options={{
          header: () => null,
        }}
      />
      <SignupStack.Screen
        name="SigninScreen"
        component={SigninScreen}
        options={{
          header: () => null,
        }}
      />
      <SignupStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          header: () => null,
        }}
      />
      <SignupStack.Screen
        name="UserInformation"
        component={UserInformation}
        options={{
          header: () => null,
        }}
      />
      <SignupStack.Screen
        name="RegisterSuccess"
        component={RegisterSuccess}
        options={{
          header: () => null,
        }}
      />
      <SignupStack.Screen
        name="VerifyGuide"
        component={VerifyGuide}
        options={{
          header: () => null,
        }}
      />
      <SignupStack.Screen
        name="InputVerifyCode"
        component={InputVerifyCode}
        options={{
          header: () => null,
        }}
      />
      <SignupStack.Screen
        name="Policy"
        component={Policy}
        options={{
          header: () => null,
        }}
      />
    </SignupStack.Navigator>
  );
}
function AfterLogin() {
  return (
    <AfterLoginStack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <AfterLoginStack.Screen
        name="Tab"
        component={Tab}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="ChatBox"
        component={CreateNewChatBox}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="FamilyDetail"
        component={FamilyDetail}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="AddNewDocument"
        component={AddNewDocument}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="PatientInformation"
        component={PatientInformation}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="InsuranceInformation"
        component={InsuranceInformation}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="AddHealthInsurance"
        component={AddHealthInsurance}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="AddPrivateInsurance"
        component={AddPrivateInsurance}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="Wallet"
        component={Wallet}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="ExamineHistory"
        component={ExamineHistory}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="CallEmergency"
        component={CallEmergency}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="ChooseLocation"
        component={ChooseLocation}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="LocationbyPhone"
        component={LocationbyPhone}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="LocationbyMap"
        component={LocationbyMap}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="PinonMap"
        component={PinonMap}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="LocationbyRegister"
        component={LocationbyRegister}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="ResultDetail"
        component={ResultDetail}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="MakeAppointment"
        component={MakeAppointment}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="ConfirmInformation"
        component={ConfirmInformation}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="MeetingCalendar"
        component={MeetingCalendar}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="InputAddress"
        component={InputAddress}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="AddHistory"
        component={AddHistory}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="Notification"
        component={Notification}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="NotificationDetail"
        component={NotificationDetail}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="DetailAppointment"
        component={DetailAppointment}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="DoctorList"
        component={DoctorList}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="CapCuuDetail"
        component={CapCuuDetail}
        options={{
          header: () => null,
        }}
      />
      {/* <AfterLoginStack.Screen
				name="CallScreen"
				component={CallScreen}
				options={{
					header: () => null
				}}
			/> */}
      <AfterLoginStack.Screen
        name="CLSDetail"
        component={CLSDetail}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="ImageHistoryDetail"
        component={ImageHistoryDetail}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="EditUserInfomation"
        component={EditUserInfomation}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="EditIdentityInfomation"
        component={EditIdentityInfomation}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="EditBHYT"
        component={EditBHYT}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="HeathyInfomation"
        component={HeathyInfomation}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="EditHeathyInfomation"
        component={EditHeathyInfomation}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="EditAddressInfomation"
        component={EditAddressInfomation}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="SelectDanToc"
        component={SelectDanToc}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="SelectNgheNghiep"
        component={SelectNgheNghiep}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="DetailKhaiBaoYTe"
        component={DetailKhaiBaoYTe}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="EditKhaiBaoYTe"
        component={EditKhaiBaoYTe}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginStack.Screen
        name="Support"
        component={Support}
        options={{
          header: () => null,
        }}
      />
    </AfterLoginStack.Navigator>
  );
}

function AfterLoginDoctor() {
  return (
    <AfterLoginDoctorStack.Navigator
      initialRouteName="DoctorTab"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <AfterLoginStack.Screen
        name="DoctorTab"
        component={DoctorTab}
        options={{
          header: () => null,
        }}
      />
      {/* <AfterLoginStack.Screen
				name="CallScreen"
				component={CallScreen}
				options={{
					header: () => null
				}}
			/> */}
      <AfterLoginStack.Screen
        name="CallHistory"
        component={CallHistory}
        options={{
          header: () => null,
        }}
      />
    </AfterLoginDoctorStack.Navigator>
  );
}

function AfterLoginAdmin() {
  return (
    <AfterLoginAdminStack.Navigator
      initialRouteName="AdminTab"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <AfterLoginAdminStack.Screen
        name="AdminTab"
        component={AdminTab}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginAdminStack.Screen
        name="Notification"
        component={Notification}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginAdminStack.Screen
        name="NotificationDetail"
        component={NotificationDetail}
        options={{
          header: () => null,
        }}
      />
      <AfterLoginAdminStack.Screen
        name="Support"
        component={Support}
        options={{
          header: () => null,
        }}
      />
    </AfterLoginAdminStack.Navigator>
  );
}
