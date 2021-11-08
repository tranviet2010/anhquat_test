import { Main as Stack } from './container/Stack';
import Main from './container/Stack';
import React from 'react';

import store from './redux/Store';

import { Provider } from 'react-redux';
import OfflineNotice from './components/OfflineNotice';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';

class App extends React.Component {
	componentDidMount() {
		// Sentry.init({
		// 	dsn: 'https://82f2071a3dd847f985b2a64a4392ed3b@o384583.ingest.sentry.io/5216003'
		// });
		SplashScreen.hide();
	}
	render() {
		return (
			<Provider store={store}>
				<OfflineNotice />
				<Stack />
			</Provider>
		);
	}
}
App = codePush({
	checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
	updateDialog: false,
	installMode: codePush.InstallMode.ON_NEXT_RESTART
})(App);
export default App;
//ios key: 2UWMv-7F21qeFXm88CDd9qXdphNp3VhXl0TgY
//android key: HD1V-oZY6g605s4h4oao9FgzET0k-b6My5Nsc
//android: appcenter codepush release-react -a congtytnhhbenhvienanhquat-gmail.com/BenhVienAnhQuat-Android -d Production
//ios: appcenter codepush release-react -a congtytnhhbenhvienanhquat-gmail.com/BenhVienAnhQuat-IOS -d Production
