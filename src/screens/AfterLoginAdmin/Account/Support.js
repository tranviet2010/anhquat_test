import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { COLOR_KETCHUP, TEXT_COLOR, COLOR_MINT, COLOR_PRIMARY } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { connect } from 'react-redux';
import { deleteDetailNotificationAction } from '../../../redux/redux/deleteDetailNotification';
import { getDetailNotificationAction } from '../../../redux/redux/getDetailNotification';
import { dateDDMMYYYY, datehhmm } from '../../../utilities/StringHelper';

class Support extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
	}

	componentDidMount() {}

	componentDidUpdate(PrevProps, PrevState) {}

	onDelete = () => {};

	render() {
		const data = this.state.data;
		return (
			<MView>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Hỗ trợ"
				/>
				<View style={styles.container}>
					<View style={{ flex: 1 }}>
						<Text style={styles.content}>{'Mọi thông tin cần hỗ trợ xin liên lạc về: '}</Text>
						<Text style={styles.title}>{'Công ty TNHH Bệnh viện Anh Quất'}</Text>
						<Text style={styles.title}>
							{'Địa chỉ: Khu bến xe khách Đồi Đỏ, TT. Cao Thượng, Tân Yên, Bắc Giang'}
						</Text>
						<Text style={styles.title}>{'Số điện thoại: '}</Text>
						<Text style={styles.title_phone} onPress={() => Linking.openURL('tel:0979112468')}>
							{'0979.112.468 '}
						</Text>
						<Text style={styles.title_phone} onPress={() => Linking.openURL('tel:0972756668')}>
							{'0972.756.668'}
						</Text>
						<Text style={styles.title_phone} onPress={() => Linking.openURL('tel:02043631868')}>
							{'02043.631.868'}
						</Text>
					</View>
				</View>
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {};
};
export default connect(mapStateToProps, {})(Support);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 10,
		marginVertical: 10,
		backgroundColor: 'white',
		borderRadius: 5,
		elevation: 3,
		paddingHorizontal: 10,
		paddingVertical: 20
	},
	title: {
		marginTop: 5,
		fontWeight: 'bold',
		fontSize: textFontSize * 1.2,
		color: TEXT_COLOR,
		textAlign: 'center'
	},
	title_phone: {
		marginTop: 5,
		fontWeight: 'bold',
		fontSize: textFontSize * 1.2,
		color: COLOR_PRIMARY,
		textAlign: 'center'
	},
	content: {
		fontSize: textFontSize + 2,
		color: TEXT_COLOR
	}
});
