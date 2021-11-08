import React from 'react';
import { View, Image, Animated, Easing, Text } from 'react-native';
import MButton from './MButton';
import { width, height, COLOR_PRIMARY } from '../utilities/config';

export default class MAlert extends React.PureComponent {
	state = {
		isShowAlert: false,
		alert: '',
		cancel: this.props.cancel,
		accept: this.props.accept,
		feedback: this.props.feedback
	};

	constructor(props) {
		super(props);
		this.animatedValue = new Animated.Value(1);
	}

	showAlert(alert, accept, cancel, feedback) {
		try {
			this.setState({
				isShowAlert: true,
				alert: alert,
				cancel: cancel,
				accept: accept,
				feedback: feedback
			});
			Animated.timing(this.animatedValue, {
				toValue: 0,
				duration: 200,
				easing: Easing.poly(2)
			}).start();
		} catch (e) {}
	}

	hiddenAlert() {
		try {
			Animated.timing(this.animatedValue, {
				toValue: 1,
				duration: 200,
				easing: Easing.poly(2)
			}).start();
			setTimeout(() => {
				this.setState({ isShowAlert: false });
			}, 200);
		} catch (e) {}
	}

	render() {
		const positionY = this.animatedValue.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ 0, height ]
		});
		if (!this.state.isShowAlert) return null;
		else
			return (
				<View
					style={{
						position: 'absolute',
						elevation: 3,
						backgroundColor: '#00000080',
						width: width,
						height: height,
						justifyContent: 'center',
						zIndex: 2
					}}
				>
					<Animated.View
						style={{ marginHorizontal: 33, zIndex: 2, transform: [ { translateY: positionY } ] }}
					>
						<View>
							<View style={{ height: 38 }} />
							<View
								style={{
									backgroundColor: '#F3F3F3',
									paddingTop: 55,
									borderTopLeftRadius: 4,
									borderTopRightRadius: 4
								}}
							/>
							<View
								style={{
									backgroundColor: '#F3F3F3',
									position: 'absolute',
									left: (width - 100 - 33 * 2) / 2,
									width: 100,
									height: 100,
									borderRadius: 50, 
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<Image
									style={{ width: 48, height: 48, resizeMode: 'stretch', borderRadius: 24 }}
									source={require('../assets/img/logo_start.png')}
								/>
							</View>
						</View>
						<View style={{ backgroundColor: '#F3F3F3', paddingBottom: 24 }}>
							<Text
								style={{ textAlign: 'center', fontSize: 16, paddingHorizontal: 16, color: '#535353' }}
							>
								{this.state.alert}
							</Text>
						</View>
						<View
							style={{
								backgroundColor: 'white',
								borderBottomRightRadius: 4,
								borderBottomLeftRadius: 4,
								overflow: 'hidden'
							}}
						>
							<View style={{ height: 50, flexDirection: 'row' }}>
								{this.state.cancel ? (
									<MButton
										onPress={() => {
											this.hiddenAlert();
											this.state.cancel();
										}}
										style={{
											flex: 1,
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: 'white'
										}}
									>
										<Text style={{ fontSize: 16, color: '#979797', fontWeight: 'bold' }}>Huỷ</Text>
									</MButton>
								) : null}
								{this.state.cancel ? (
									<View style={{ width: 1, height: 50, backgroundColor: '#F3F3F3' }} />
								) : null}
								{this.state.feedback ? (
									<MButton
										onPress={() => {
											this.hiddenAlert();
											this.state.feedback();
										}}
										style={{
											flex: 1,
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: 'white'
										}}
									>
										<Text style={{ fontSize: 16, color: '#979797', fontWeight: 'bold' }}>
											Report
										</Text>
									</MButton>
								) : null}
								{this.state.feedback ? (
									<View style={{ width: 1, height: 50, backgroundColor: '#F3F3F3' }} />
								) : null}

								<MButton
									onPress={() => {
										this.hiddenAlert();
										this.state.accept();
									}}
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: 'white'
									}}
								>
									<Text style={{ fontSize: 16, color: COLOR_PRIMARY, fontWeight: 'bold' }}>
										Đồng ý
									</Text>
								</MButton>
							</View>
						</View>
					</Animated.View>
				</View>
			);
	}
}
