import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { textFontSize } from '../../../utilities/Styles';
import { COLOR_WHITEGRAY, COLOR_PRIMARY, width, TEXT_COLOR } from '../../../utilities/config';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { xoa_dau } from '../../../utilities/StringHelper';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

export default class InputAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeHolder: 'Tìm kiếm',
			search_string: '',
			picked_tinh: this.props.route.params.picked_tinh ? this.props.route.params.picked_tinh : {},
			picked_huyen: this.props.route.params.picked_huyen ? this.props.route.params.picked_huyen : {},
			picked_xa: this.props.route.params.picked_xa ? this.props.route.params.picked_xa : {},
			data_tinh: this.props.route.params.data_tinh ? this.props.route.params.data_tinh : [],
			data_huyen: this.props.route.params.data_huyen ? this.props.route.params.data_huyen : [],
			data_xa: this.props.route.params.data_xa ? this.props.route.params.data_xa : [],
			matched_tinh: this.props.route.params.data_tinh ? this.props.route.params.data_tinh : [],
			matched_huyen: this.props.route.params.data_huyen ? this.props.route.params.data_huyen : [],
			matched_xa: this.props.route.params.data_xa ? this.props.route.params.data_xa : []
		};
	}
	componentDidMount() {
		if (this.state.picked_tinh.bv_tinh) {
			this.setState({ search_string: this.state.picked_tinh.bv_tinh }, () => {
				this.search(this.state.search_string);
			});
		}
		if (this.state.picked_huyen.bv_huyen) {
			this.setState({ search_string: this.state.picked_huyen.bv_huyen }, () => {
				this.search(this.state.search_string);
			});
		}
		if (this.state.picked_xa.bv_xa) {
			this.setState({ search_string: this.state.picked_xa.bv_xa }, () => {
				this.search(this.state.search_string);
			});
		}
	}
	chooseTinh = (item) => {
		this.setState({ picked_tinh: item });
		if (this.props.route.params.action_choose_tinh) {
			this.props.route.params.action_choose_tinh(item);
		}
		this.props.navigation.pop();
	};
	chooseHuyen = (item) => {
		this.setState({ picked_huyen: item });
		if (this.props.route.params.action_choose_huyen) {
			this.props.route.params.action_choose_huyen(item);
		}
		this.props.navigation.pop();
	};

	chooseXa = (item) => {
		this.setState({ picked_xa: item });
		if (this.props.route.params.action_choose_xa) {
			this.props.route.params.action_choose_xa(item);
		}
		this.props.navigation.pop();
	};

	renderItemTinh = ({ item }) => {
		let is_picked = this.state.picked_tinh.bv_ma_tinh === item.bv_ma_tinh;
		return (
			<TouchableOpacity
				key={item.bv_tinh}
				onPress={() => this.chooseTinh(item)}
				style={[
					styles.item,
					{
						backgroundColor: is_picked ? COLOR_PRIMARY : 'white'
					}
				]}
			>
				<Text style={[ styles.title, { color: is_picked ? 'white' : TEXT_COLOR } ]}>{item.bv_tinh}</Text>
				{is_picked ? <IonIcon name="checkmark-outline" size={30} color={'white'} /> : <View />}
			</TouchableOpacity>
		);
	};
	renderItemHuyen = ({ item }) => {
		let is_picked = this.state.picked_huyen.bv_ma_huyen === item.bv_ma_huyen;

		return (
			<TouchableOpacity
				key={item.bv_huyen}
				onPress={() => this.chooseHuyen(item)}
				style={[
					styles.item,
					{
						backgroundColor: is_picked ? COLOR_PRIMARY : 'white'
					}
				]}
			>
				<Text style={[ styles.title, { color: is_picked ? 'white' : TEXT_COLOR } ]}>{item.bv_huyen}</Text>
				{is_picked ? <IonIcon name="checkmark-outline" size={30} color={'white'} /> : <View />}
			</TouchableOpacity>
		);
	};
	renderItemXa = ({ item }) => {
		let is_picked = this.state.picked_xa.bv_ma_xa === item.bv_ma_xa;

		return (
			<TouchableOpacity
				key={item.bv_xa}
				onPress={() => this.chooseXa(item)}
				style={[
					styles.item,
					{
						backgroundColor: is_picked ? COLOR_PRIMARY : 'white'
					}
				]}
			>
				<Text style={[ styles.title, { color: is_picked ? 'white' : TEXT_COLOR } ]}>{item.bv_xa}</Text>
				{is_picked ? <IonIcon name="checkmark-outline" size={30} color={'white'} /> : <View />}
			</TouchableOpacity>
		);
	};
	search = (text) => {
		this.setState({ search_string: text });
		let matched_tinh = this.state.data_tinh.filter((value) => {
			return xoa_dau(value.bv_tinh.toString()).toLocaleLowerCase().search(xoa_dau(text).toLocaleLowerCase()) >= 0;
		});
		let matched_huyen = this.state.data_huyen.filter((value) => {
			return (
				xoa_dau(value.bv_huyen.toString()).toLocaleLowerCase().search(xoa_dau(text).toLocaleLowerCase()) >= 0
			);
		});
		let matched_xa = this.state.data_xa.filter((value) => {
			return xoa_dau(value.bv_xa.toString()).toLocaleLowerCase().search(xoa_dau(text).toLocaleLowerCase()) >= 0;
		});
		this.setState({ matched_tinh, matched_huyen, matched_xa });
	};

	render() {
		return (
			<MView style={{ backgroundColor: 'white' }}>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="THÔNG TIN ĐỊA CHỈ"
				/>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<TextInput
						autoFocus
						fontSize={15}
						value={this.state.search_string}
						selectionColor={COLOR_PRIMARY}
						placeholder={this.state.placeHolder}
						autoCapitalize="words"
						multiline={false}
						onChangeText={(text) => this.search(text)}
						autoCorrect={false}
						underlineColorAndroid="transparent"
						returnKeyType={'done'}
						maxLength={50}
						style={{
							height: 50,
							backgroundColor: 'white',
							paddingHorizontal: width / 20,
							borderRadius: 5,
							flex: 1
						}}
					/>
					{this.state.search_string != '' && (
						<TouchableOpacity
							onPress={() => {
								this.search('');
							}}
							style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
						>
							<FontAwesome5Pro name="times" size={15} color={TEXT_COLOR} />
						</TouchableOpacity>
					)}
				</View>

				{this.state.data_tinh.length > 0 && (
					<FlatList
						keyboardShouldPersistTaps="handled"
						data={this.state.matched_tinh}
						renderItem={(item) => this.renderItemTinh(item)}
						keyExtractor={(item) => item.bv_ma_tinh}
						removeClippedSubviews={true}
					/>
				)}
				{this.state.data_huyen.length > 0 && (
					<FlatList
						keyboardShouldPersistTaps="handled"
						data={this.state.matched_huyen}
						renderItem={(item) => this.renderItemHuyen(item)}
						keyExtractor={(item) => item.bv_huyen_id}
						removeClippedSubviews={true}
					/>
				)}
				{this.state.data_xa.length > 0 && (
					<FlatList
						keyboardShouldPersistTaps="handled"
						data={this.state.matched_xa}
						renderItem={(item) => this.renderItemXa(item)}
						keyExtractor={(item) => item.bv_xa_id}
						removeClippedSubviews={true}
					/>
				)}
			</MView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10
	},
	item: {
		alignItems: 'center',
		paddingHorizontal: width / 20,
		paddingVertical: 10,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderBottomColor: COLOR_WHITEGRAY,
		borderBottomWidth: 1,
		borderTopColor: COLOR_WHITEGRAY,
		borderTopWidth: 1,
		justifyContent: 'space-between'
	},
	title: {
		fontSize: textFontSize * 1.2
	},
	icon: {
		position: 'absolute',
		right: width / 20,
		fontSize: textFontSize * 1.5,
		color: 'green'
	}
});
