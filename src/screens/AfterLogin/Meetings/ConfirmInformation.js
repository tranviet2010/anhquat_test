import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { COLOR_MINT, width, TEXT_COLOR, COLOR_PRIMARY } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import NButton from '../../../components/NButton';
import { connect } from 'react-redux';
import { createAppointmentAction } from '../../../redux/redux/createAppointment';
import { getDetailAppointmentAction } from '../../../redux/redux/getDetailAppointment';


import { CommonActions, StackActions } from '@react-navigation/native';
import MAsyncStorage from '../../../utilities/MAsyncStorage';

class ConfirmInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {}
		};
	}

	componentDidMount = async () => {
		const user = await MAsyncStorage.getUserInfo();
		if (user) {
			this.setState({
				userData: user
			});
		}
	};

	onCreate = () => {
		let timedate = this.props.route.params.timedatedata;
		console.log(timedate);
		this.props.createAppointmentAction(timedate);
	};

	componentDidUpdate(PrevProps, PrevState) {
		if (PrevProps.createAppointmentReducer != this.props.createAppointmentReducer) {
			if (this.props.createAppointmentReducer.isSuccess) {
				this.props.navigation.pop();
				this.props.navigation.pop();
				this.props.navigation.navigate('DetailAppointment', { appointment_id: this.props.createAppointmentReducer.data._id });
				this.props.navigation.navigate('EditKhaiBaoYTe', {
					data: this.props.createAppointmentReducer.data,
					is_lich_hen: true,
					action: () =>
						this.props.getDetailAppointmentAction(
							this.props.createAppointmentReducer.data._id
						)
				});
			} else {
				console.log('create appointment fail');
			}
		}
	}

	render() {
		let timedate = this.props.route.params.timedatedata;

		const info = this.state.userData ? this.state.userData : null;

		console.log('aaaaaaaaaaaaaaaaaaa', info);
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="X??c nh???n th??ng tin ?????t h???n"
				/>
				<View style={[ styles.container, { flex: 0 } ]}>
					{/* <View style={styles.titleContainer}>
						<Text style={styles.title}>Th??ng tin ?????t h???n</Text>
					</View> */}
					<View style={styles.card}>
						{timedate.loai == 0 ? (
							<View style={{ alignItems: 'center', marginTop: 10 }}>
								<Text style={{ color: COLOR_PRIMARY, fontSize: textFontSize + 4, fontWeight: 'bold' }}>
									Kh??m b???nh
								</Text>
								<Text
									style={{
										fontSize: textFontSize,
										color: TEXT_COLOR
									}}
								>
									(Kh??m ch???a b???nh)
								</Text>
							</View>
						) : null}
						{timedate.loai == 1 ? (
							<View style={{ alignItems: 'center', marginTop: 10 }}>
								<Text style={{ color: COLOR_PRIMARY, fontSize: textFontSize + 4, fontWeight: 'bold' }}>
									Kh??m s???c kho???
								</Text>
								<Text
									style={{
										fontSize: textFontSize,
										color: TEXT_COLOR,
										textAlign: 'center'
									}}
								>
									(???????c c???p gi???y ch???ng nh???n s???c kho???)
								</Text>
							</View>
						) : null}
						<View style={{ flexDirection: 'row' }}>
							<View style={styles.container}>
								<Text style={styles.titleText}>H??? v?? t??n</Text>
								{info.user ? <Text style={styles.contentText}>{info.user.full_name}</Text> : <View />}
							</View>
							<View style={styles.container}>
								<Text style={styles.titleText}>S??? ??i???n tho???i</Text>
								{info.user ? <Text style={styles.contentText}>{info.user.phone}</Text> : <View />}
							</View>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<View style={styles.container}>
								<Text style={styles.titleText}>S??? th??? BHYT</Text>
								{info.bhyt ? (
									<Text style={styles.contentText}>{info.bhyt.so_bhyt}</Text>
								) : (
									<Text style={styles.contentText}>Ch??a c?? BHYT</Text>
								)}
							</View>
							<View style={styles.container}>
								<Text style={styles.titleText}>CMT/CCCD</Text>
								{info.identity ? (
									<Text style={styles.contentText}>{info.identity.so_cmt}</Text>
								) : (
									<Text style={styles.contentText}>Ch??a c?? s??? CMT</Text>
								)}
							</View>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<View style={styles.container}>
								<Text style={styles.titleText}>Th???i gian h???n</Text>
								<Text style={styles.contentText}>{timedate.thoi_gian}</Text>
							</View>
						</View>
						<View style={{ marginTop: width / 25, marginHorizontal: width / 25 }}>
							<Text style={styles.titleText}>L?? do h???n</Text>
							<Text style={styles.contentText}>{timedate.ly_do}</Text>
						</View>
					</View>
				</View>
				<NButton
					onPress={() => {
						// this.props.navigation.navigate("ConfirmInformation")
						this.onCreate();
					}}
					top={width / 3}
					text="TI???P T???C"
					style={{ marginTop: width / 20 }}
					bgCl={COLOR_PRIMARY}
				/>
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		createAppointmentReducer: state.createAppointmentReducer
	};
};

export default connect(mapStateToProps, { createAppointmentAction,getDetailAppointmentAction })(ConfirmInformation);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: width / 25,
		marginHorizontal: width / 25
	},
	title: {
		color: COLOR_MINT,
		fontSize: textFontSize * 1.3,
		fontWeight: 'bold'
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	titleText: {
		fontSize: textFontSize,
		color: '#211f20'
	},
	contentText: {
		fontSize: textFontSize * 1.2,
		color: TEXT_COLOR,
		fontWeight: 'bold'
	},
	card: {
		backgroundColor: 'white',
		marginTop: width / 20,
		paddingBottom: width / 30
	}
});
