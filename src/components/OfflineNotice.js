import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

function disconnected() {
	return (
		<SafeAreaView>
			<StatusBar barStyle={'dark-content'} />
			<View style={styles.disconnected}>
				<Text style={styles.offlineText}>Mất kết nối mạng</Text>
			</View>
		</SafeAreaView>
	);
}
function connected() {
	return (
		<SafeAreaView>
			<StatusBar barStyle={'dark-content'} />

			<View style={styles.connected}>
				<Text style={styles.offlineText}>Đã kết nối mạng</Text>
			</View>
		</SafeAreaView>
	);
}

class OfflineNotice extends PureComponent {
	state = {
		old_state_connect: true,
		new_state_connect: true,
		animated: new Animated.Value(1)
	};

	componentDidMount() {
		this.unsubscribe = NetInfo.addEventListener((state) => {
			console.log('Connection type', state.type);
			console.log('Is connected?', state.isConnected);
			this.handleConnectivityChange(state.isConnected);
		});
	}

	componentWillUnmount() {
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}

	handleConnectivityChange = (isConnected) => {
		if (!isConnected) {
			this.setState({ new_state_connect: false, old_state_connect: false });
		} else {
			if (this.state.old_state_connect) {
				this.setState({ new_state_connect: true });
			} else {
				this.setState({ new_state_connect: true }, () =>
					setTimeout(() => {
						this.setState({ old_state_connect: true });
					}, 1000)
				);
			}
		}
	};
	network() {
		return this.state.new_state_connect;
	}
	render() {
		if (this.state.old_state_connect && this.state.new_state_connect) {
			return null;
		} else if (!this.state.old_state_connect && this.state.new_state_connect) {
			return connected();
		} else {
			return disconnected();
		}
	}
}

const styles = StyleSheet.create({
	disconnected: {
		backgroundColor: '#b52424',
		height: 25,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width,
		// position: 'absolute',
		top: 0
	},
	connected: {
		backgroundColor: 'green',
		height: 25,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width,
		// position: 'absolute',
		top: 0
	},
	offlineText: { color: '#fff', fontSize: 14, padding: 5 }
});

export default OfflineNotice;
