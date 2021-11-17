import { combineReducers } from 'redux';
import { loginReducer } from './redux/login';
import { signupAccountReducer } from './redux/signup';
import { checkAccountExistReducer } from './redux/checkAccountExist';
import { checkPresenterReducer } from './redux/checkPresenter';
import { userInfoReducer } from './redux/userInfo';
import { deleteDeviceTokenReducer } from './redux/deleteDeviceToken';
import { registerDeviceTokenReducer } from './redux/registerDeviceToken';
import { createAppointmentReducer } from './redux/createAppointment';
import { getAppointmentListReducer } from './redux/getAppointmentList';
import { createNewExamineHistoryReducer } from './redux/createNewExamineHistory';
import { getHistoryReducer } from './redux/getHistory';
import { deleteHistoryReducer } from './redux/deleteHistory';
import { updateAvatarReducer } from './redux/updateAvatar';
import { deleteAppointmentReducer } from './redux/deleteAppointment';
import { subcribeReducer } from './redux/subcribe';
import { getNotificationReducer } from './redux/getNotification';
import { deleteNotificationReducer } from './redux/deleteNotification';
import { deleteDetailNotificationReducer } from './redux/deleteDetailNotification';
import { getDetailNotificationReducer } from './redux/getDetailNotification';
import { deleteSubcriberReducer } from './redux/deleteSubcriber';
import { getUserInfoReducer } from './redux/getUserInfo';
import { sendSMSOTPReducer } from './redux/sendSMSOTP';
import { checkTokenReducer } from './redux/checkToken';
import { getDetailAppointmentReducer } from './redux/getDetailAppointment';
import { getListDoctorReducer } from './redux/getListDoctor';
import { chatReducer } from './redux/chat';
import { createCapCuuReducer } from './redux/createCapCuu';
import { getCointHistoryReducer } from './redux/getCointHistory';
import { setCallRefReducer } from './redux/callRef';
import { getLichSuKhamReducer } from './redux/getLichSuKham';
import { getChiTietLichSuKhamReducer } from './redux/getChiTietLichSuKham';
import { getHinhAnhCanLamSangReducer } from './redux/getHinhAnhCanLamSang';
import { updateAccountReducer } from './redux/updateAccount';
import { updateBHYTReducer } from './redux/updateBHYT';
import { createBHYTReducer } from './redux/createBHYT';
import { createCMTReducer } from './redux/createCMT';
import { getListCityReducer } from './redux/getListCity';
import { getListDistrictReducer } from './redux/getListDistrict';
import { getListWardReducer } from './redux/getListWard';
import { getListNgheNghiepReducer } from './redux/getListNgheNghiep';
import { getListDanTocReducer } from './redux/getListDanToc';
import { updateKhaiBaoYTeReducer } from './redux/updateKhaiBaoYTe';
import { popupCointReducer } from './redux/popupCoint';

const reducer = combineReducers({
	popupCointReducer,
	updateKhaiBaoYTeReducer,
	getListDanTocReducer,
	getListNgheNghiepReducer,
	getListDistrictReducer,
	getListWardReducer,
	getListCityReducer,
	createCMTReducer,
	createBHYTReducer,
	updateBHYTReducer,
	updateAccountReducer,
	getHinhAnhCanLamSangReducer,
	getChiTietLichSuKhamReducer,
	getLichSuKhamReducer,
	setCallRefReducer,
	getCointHistoryReducer,
	createCapCuuReducer,
	chatReducer,
	checkTokenReducer,
	sendSMSOTPReducer,
	loginReducer,
	signupAccountReducer,
	checkAccountExistReducer,
	checkPresenterReducer,
	userInfoReducer,
	deleteDeviceTokenReducer,
	registerDeviceTokenReducer,
	createAppointmentReducer,
	getAppointmentListReducer,
	createNewExamineHistoryReducer,
	getHistoryReducer,
	deleteHistoryReducer,
	updateAvatarReducer,
	deleteAppointmentReducer,
	subcribeReducer,
	getNotificationReducer,
	deleteNotificationReducer,
	deleteSubcriberReducer,
	deleteDetailNotificationReducer,
	getDetailNotificationReducer,
	getUserInfoReducer,
	getDetailAppointmentReducer,
	getListDoctorReducer
});
export default reducer;
