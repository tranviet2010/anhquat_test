import React, { Component } from 'react';
import { View } from 'react-native';
import { TEXT_COLOR } from '../utilities/config';
import Dash from 'react-native-dash';

class OneLineColumn extends Component {
	render() {
		const { height, width, margin, color } = this.props;
		return (
			<Dash
				style={{
					width: 1,
					height: height ? height : '100%',
					flexDirection: 'column',
					margin: margin ? margin : 0
				}}
				dashThickness={1}
				dashColor={color ? color : TEXT_COLOR}
			/>

			// <View
			// 	style={{
			// 		borderStyle: 'dashed',
			// 		borderWidth: 0.5,
			// 		borderColor: color ? color : TEXT_COLOR,
			// 		marginHorizontal: margin ? margin : 0,
			// 		height: height ? height : '100%'
			// 	}}
			// />
		);
	}
}
class OneLine extends Component {
	render() {
		const { height, width, margin, color, style } = this.props;
		return (
			<View
				style={[
					{
						width: '100%',
						height: height ? height : 1,
						backgroundColor: color ? color : '#f1f1f1',
						alignSelf: 'flex-end'
					},
					style ? style : {}
				]}
			/>
		);
	}
}
class OneLineMedium extends Component {
	render() {
		const { style } = this.props;
		return (
			<View
				style={[
					{ width: '100%', height: 5, backgroundColor: '#f1f1f1', alignSelf: 'flex-end' },
					style ? style : {}
				]}
			/>
		);
	}
}
export { OneLineColumn, OneLineMedium };
export default OneLine;
