import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import MView from '../../components/MView';
import { width, COLOR_PRIMARY, TEXT_COLOR } from '../../utilities/config';
import { textFontSize } from '../../utilities/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, StackActions } from '@react-navigation/native';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { connect } from 'react-redux';
import MHeader from '../../components/MHeader';
import { ScrollView } from 'react-native-gesture-handler';

const nen = require('../../assets/img/hoan_thanh.png');

class Policy extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<MView style={{ backgroundColor: 'white' }}>
				<MHeader
					onPress={() => {
						this.props.navigation.pop();
					}}
					text="Chính sách bảo mật thông tin"
				/>
				<ScrollView contentContainerStyle={{ padding: 10 }}>
					<Text style={[ styles.title_1 ]}>Điều 1: Mục đích và phạm vi thu thập thông tin</Text>
					<Text style={[ styles.title_2 ]}>1.1. Mục đích thu thập thông tin</Text>
					<Text style={[ styles.text ]}>
						- Đối với khách hàng đặt lịch khám: Họ tên, Số hồ sơ Anh Quất (nếu có), ngày sinh, email, số
						điện thoại, chuyên khoa cần khám và các yêu cầu khác (nếu có) …
					</Text>
					<Text style={[ styles.text ]}>
						- Đối với khách hàng có sử dụng ứng dụng sổ tay cho khách hàng y tế trên thiết bị thông minh:
						Tài khoản đăng ký, SĐT, thẻ BHYT, CMT,…
					</Text>
					<Text style={[ styles.text ]}>
						- Đối với khách hàng gọi xe cấp cứu: Cần nhập rõ địa chỉ nơi ở hoặc khi gọi cần bật định vị để
						gửi địa chỉ chính xác nhất cho Công ty TNHH bệnh viện Anh Quất
					</Text>
					<Text style={[ styles.text ]}>
						Đây là các thông tin khách hàng cần cung cấp khi đăng ký và sử dụng ứng dụng để dịch vụ đặt lịch
						khám, tra cứu kết quả, hình ảnh cận lâm sàng (hình ảnh cắt lớp vi tính, siêu âm, cộng hưởng từ,
						nội soi, điện tim, điện não,…), đơn thuốc và gọi xe cấp cứu.
					</Text>
					<Text style={[ styles.title_2 ]}>1.2. Phạm vi thu thập thông tin cá nhân</Text>
					<Text style={[ styles.text ]}>- Cung cấp các dịch vụ đến khách hàng.</Text>
					<Text style={[ styles.text ]}>
						- Gửi các thông báo về các hoạt động trao đổi thông tin đến khách hàng
					</Text>
					<Text style={[ styles.text ]}>
						- Liên lạc và giải quyết với khách hàng trong những trường hợp đặc biệt.
					</Text>
					<Text style={[ styles.title_1, { marginTop: 10 } ]}>Điều 2: Phạm vi sử dụng thông tin</Text>
					<Text style={[ styles.text ]}>
						- Những thông tin liên hệ mà chúng tôi thu thập trên chỉ được dùng cho mục đích thông tin cá
						nhân, giúp chúng tôi liên lạc với khách hàng về những vấn đề cá nhân như đặt hẹn khám bệnh, cung
						cấp biểu giá, kết quả cận lâm sàng, hình ảnh, đơn thuốc, gọi xe cấp cứu v.v… hoặc gửi bản tin
						cập nhật về bệnh viện.
					</Text>
					<Text style={[ styles.text ]}>
						- Thông tin của khách hàng được sử dụng để giúp cung cấp cho các dịch vụ của chúng tôi.
					</Text>
					<Text style={[ styles.text ]}>
						- Nâng cao chất lượng chăm sóc, điều trị người bệnh giữa bác sĩ và khách hàng y tế.
					</Text>
					<Text style={[ styles.title_1, { marginTop: 10 } ]}>Điều 3: Thời gian lưu trữ thông tin</Text>
					<Text style={[ styles.text ]}>
						Chúng tôi sẽ lưu trữ các thông tin cá nhân do khách hàng cung cấp trên các hệ thống quản lý, lưu
						trữ dữ liệu của chúng tôi cho đến khi hoàn thành mục đích thu thập hoặc khi bạn có yêu cầu hủy
						các thông tin đã cung cấp.
					</Text>
					<Text style={[ styles.title_1, { marginTop: 10 } ]}>
						Điều 4: Địa chỉ thu thập và quản lý thông tin cá nhân
					</Text>

					<Text style={[ styles.text ]}>CÔNG TY TNHH BỆNH VIỆN ANH QUẤT </Text>
					<Text style={[ styles.text ]}>
						Địa chỉ: Khu Đồi Đỏ, thị trấn Cao Thượng, huyện Tân Yên, tỉnh Bắc Giang.{' '}
					</Text>
					<Text style={[ styles.text, { color: 'blue' } ]} onPress={() => {}}>
						Điện thoại: 02043 833 115{' '}
					</Text>
					<Text style={[ styles.title_1, { marginTop: 10 } ]}>
						Điều 5: Phương tiện, công cụ để khách hàng tiếp cận và chỉnh sửa dữ liệu cá nhân
					</Text>
					<Text style={[ styles.text ]}>
						Nếu khách hàng không quan tâm hoặc không muốn nhận tin tức, thông tin, khách hàng có thể hủy
						thông tin vào bất kỳ lúc nào bằng cách truy cập ứng dụng của chúng tôi để xóa.
					</Text>
					<Text style={[ styles.title_1, { marginTop: 10 } ]}>
						Điều 6: Chính sách bảo vệ thông tin khách hàng
					</Text>

					<Text style={[ styles.text ]}>
						Ngoài việc sử dụng các thông tin của khách hàng vào các mục đích nêu tại Khoản 1.1 Điều 1 và
						phạm vi nêu tại Điều 2 của Chính sách bảo mật thông tin này, chúng tôi sẽ giữ bí mật thông tin
						cá nhân của bạn theo luật khám chữa bệnh. Chúng tôi chỉ được phép công bố khi khách hàng đồng ý
						hoặc theo yêu cầu của cơ quan nhà nước có thẩm quyền.{' '}
					</Text>
					<Text style={[ styles.title_1, { marginTop: 10 } ]}>
						Điều 7: Khách hàng cam kết sẽ không để lộ thông tin cá nhân, lịch sử khám, kết quả hình ảnh khám
						ra bên ngoài.
					</Text>
				</ScrollView>
			</MView>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userInfoReducer: state.userInfoReducer
	};
};

export default connect(mapStateToProps)(Policy);
const styles = StyleSheet.create({
	image: {
		//flex: 0.5,
		height: width,
		flexDirection: 'column',
		justifyContent: 'center'
		//paddingBottom: height/10
	},
	title_1: {
		color: TEXT_COLOR,
		fontSize: textFontSize + 2,
		fontWeight: 'bold'
	},
	title_2: {
		color: TEXT_COLOR,
		fontSize: textFontSize + 2,
		fontStyle: 'italic'
	},
	text: {
		color: TEXT_COLOR,
		marginTop: 10
	},
	btnstart: {
		backgroundColor: COLOR_PRIMARY,
		marginHorizontal: width / 20,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: width / 20
	}
});
