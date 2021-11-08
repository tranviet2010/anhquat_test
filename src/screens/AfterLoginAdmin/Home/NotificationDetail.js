import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { COLOR_KETCHUP, TEXT_COLOR } from '../../../utilities/config';
import { textFontSize } from '../../../utilities/Styles';
import { connect } from 'react-redux';
import { deleteDetailNotificationAction } from '../../../redux/redux/deleteDetailNotification';
import { getDetailNotificationAction } from '../../../redux/redux/getDetailNotification';
import { dateDDMMYYYY, datehhmm } from '../../../utilities/StringHelper';

class NotificationDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
	}

	componentDidMount() {
		const id = this.props.route.params.id;
		this.props.getDetailNotificationAction(id);
	}

	componentDidUpdate(PrevProps, PrevState) {
		if (PrevProps.deleteDetailNotificationReducer != this.props.deleteDetailNotificationReducer) {
			if (this.props.deleteDetailNotificationReducer.isSuccess) {
				this.props.navigation.pop();
			}
		}
		if (PrevProps.getDetailNotificationReducer != this.props.getDetailNotificationReducer) {
			if (this.props.getDetailNotificationReducer.isSuccess) {
				this.setState({ data: this.props.getDetailNotificationReducer.data });
			}
		}
	}

	onDelete = () => {
		const id = this.props.route.params.id;
		this.props.deleteDetailNotificationAction(id);
	};

	render() {
		const data = this.state.data;
		return (
			<MView>
				<MHeader
					rightComponent={
						<TouchableOpacity onPress={this.onDelete} style={{ right: 5 }}>
							<Text style={{ color: 'white', fontSize: textFontSize }}>Xóa</Text>
						</TouchableOpacity>
					}
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Chi tiết thông báo"
				/>
				{data ? (
					<View style={styles.container}>
						<Text style={styles.title}>{data.thong_bao.title}</Text>
						<Text style={{ textAlign: 'center', fontSize: textFontSize }}>
							{datehhmm(data.thong_bao.createdAt) + ' ' + dateDDMMYYYY(data.thong_bao.createdAt)}
						</Text>

						<View style={{ flex: 1 }}>
							<Text style={styles.content}>{data.thong_bao.content}</Text>
						</View>
					</View>
				) : (
					<View />
				)}
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		deleteDetailNotificationReducer: state.deleteDetailNotificationReducer,
		getDetailNotificationReducer: state.getDetailNotificationReducer
	};
};
export default connect(mapStateToProps, { deleteDetailNotificationAction, getDetailNotificationAction })(
	NotificationDetail
);

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
		fontWeight: 'bold',
		fontSize: textFontSize * 1.2,
		color: TEXT_COLOR,
		marginBottom: 20,
		textAlign: 'center'
	},
	content: {
		fontSize: textFontSize + 2,
		color: TEXT_COLOR,
		textAlign: 'justify'
	}
});
