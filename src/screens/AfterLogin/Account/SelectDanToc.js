import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import MView from '../../../components/MView';
import MHeader from '../../../components/MHeader';
import { textFontSize } from '../../../utilities/Styles';
import { COLOR_WHITEGRAY, COLOR_PRIMARY, width, TEXT_COLOR } from '../../../utilities/config';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

import { xoa_dau } from '../../../utilities/StringHelper';

export default class SelectDanToc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeHolder: 'Tìm kiếm',
			search_string: '',
			picked: this.props.route.params.picked ? this.props.route.params.picked : {},
			data: this.props.route.params.data ? this.props.route.params.data : [],
			matched: this.props.route.params.data ? this.props.route.params.data : [],
			ma: this.props.route.params.ma ? this.props.route.params.ma : 'ma',
			name: this.props.route.params.name ? this.props.route.params.name : 'name',
			header: this.props.route.params.header ? this.props.route.params.header : 'Chọn dân tộc'
		};
	}
	componentDidMount() {
		if (this.state.picked[this.state.name]) {
			this.setState({ search_string: this.state.picked[this.state.name] }, () => {
				this.search(this.state.search_string);
			});
		}
	}
	choose = (item) => {
		this.setState({ picked: item });
		if (this.props.route.params.action_choose) {
			this.props.route.params.action_choose(item);
		}
		this.props.navigation.pop();
	};

	renderItem = ({ item }) => {
		let is_picked = this.state.picked[this.state.ma] === item[this.state.ma];
		return (
			<TouchableOpacity
				key={item[this.state.ma]}
				onPress={() => this.choose(item)}
				style={[
					styles.item,
					{
						backgroundColor: is_picked ? COLOR_PRIMARY : 'white'
					}
				]}
			>
				<Text style={[ styles.title, { color: is_picked ? 'white' : TEXT_COLOR } ]}>
					{item[this.state.name]}
				</Text>
				{is_picked ? <IonIcon name="checkmark-outline" size={30} color={'white'} /> : <View />}
			</TouchableOpacity>
		);
	};

	search = (text) => {
		this.setState({ search_string: text });
		let matched = this.state.data.filter((value) => {
			return (
				xoa_dau(value[this.state.name].toString())
					.toLocaleLowerCase()
					.search(xoa_dau(text).toLocaleLowerCase()) >= 0
			);
		});

		this.setState({ matched });
	};

	render() {
		return (
			<MView style={{ backgroundColor: 'white' }}>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text={this.state.header}
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
							flex: 1,
							height: 50,
							backgroundColor: 'white',
							paddingHorizontal: width / 20,
							borderRadius: 5
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

				{this.state.data.length > 0 && (
					<FlatList
						keyboardShouldPersistTaps="handled"
						data={this.state.matched}
						renderItem={(item) => this.renderItem(item)}
						keyExtractor={(item) => item[this.state.ma]}
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
