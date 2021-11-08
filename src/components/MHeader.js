import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { Header } from 'react-native-elements';
import { width, isIphoneX, height } from '../utilities/config';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { textFontSize } from '../utilities/Styles';

export default class MHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	customLeftIcon = (onPress) => {
		return (
			<View style={{ width: width / 3 }}>
				<IonIcon
					onPress={onPress}
					name="chevron-back-outline"
					style={{
						color: 'white',
						fontSize: textFontSize * 1.5
					}}
				/>
			</View>
		);
	};

	render() {
		return (
			<View>
				<Header
					containerStyle={{ height: isIphoneX() ? 100 : Platform.OS == 'android' ? 100 : 50 }}
					rightComponent={this.props.rightComponent}
					leftComponent={this.customLeftIcon(this.props.onPress)}
					centerComponent={{
						text: this.props.text,
						style: { color: '#fff', fontSize: textFontSize * 1.3, fontWeight: 'bold' }
					}}
				/>
			</View>
		);
	}
}
