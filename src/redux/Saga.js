import { all, put, takeLatest } from 'redux-saga/effects';
import { LOGIN, loginSaga } from './redux/login';
import { SIGNUP_ACCOUNT, signupAccountSaga } from './redux/signup';
import { checkAccountExistSaga, CHECK_ACCOUNT_EXIST } from './redux/checkAccountExist';
import { checkPresenterSaga, CHECK_PRESENTER } from './redux/checkPresenter';
import { deleteDeviceTokenSaga, DELETE_DEVICE_TOKEN } from './redux/deleteDeviceToken';
import { registerDeviceTokenSaga, REGISTER_DEVICE_TOKEN } from './redux/registerDeviceToken';
import { createAppointmentSaga, CREATE_APPOINTMENT } from './redux/createAppointment';
import { getAppointmentListSaga, GET_APPOINTMENT_LIST } from './redux/getAppointmentList';
import { createNewExamineHistorySaga, CREATE_NEW_EXAMINE_HISTORY } from './redux/createNewExamineHistory';
import { getHistorySaga, GET_HISTORY } from './redux/getHistory';
import { deleteHistorySaga, DELETE_HISTORY } from './redux/deleteHistory';
import { updateAvatarSaga, UPDATE_AVATAR } from './redux/updateAvatar';
import { deleteAppointmentSaga, DELETE_APPOINTMENT } from './redux/deleteAppointment';
import { subcribeSaga, SUBCRIBE } from './redux/subcribe';
import { getNotificationSaga, GET_NOTIFICATION } from './redux/getNotification';
import { deleteNotificationSaga, DELETE_NOTIFICATION } from './redux/deleteNotification';
import { deleteSubcriberSaga, DELETE_SUBCRIBER } from './redux/deleteSubcriber';
import { deleteDetailNotificationSaga, DELETE_DETAIL_NOTIFICATION } from './redux/deleteDetailNotification';
import { getDetailNotificationSaga, GET_DETAIL_NOTIFICATION } from './redux/getDetailNotification';
import { getUserInfoSaga, GET_USER_INFO } from './redux/getUserInfo';
import { checkTokenSaga, CHECK_TOKEN } from './redux/checkToken';
import { sendSMSOTPSaga, SEND_SMS_OTP } from './redux/sendSMSOTP';
import { getDetailAppointmentSaga, GET_DETAIL_APPOINTMENT } from './redux/getDetailAppointment';
import { GET_LIST_DOCTOR, getListDoctorSaga } from './redux/getListDoctor';
import {
	getListChatSaga,
	GET_LIST_CHAT,
	sendMessageChatSaga,
	SEND_MESSAGE_CHAT,
	SEND_IMAGE_CHAT,
	sendImageChatSaga
} from './redux/chat';
import { createCapCuuSaga, CREATE_CAP_CUU } from './redux/createCapCuu';
import { getCointHistorySaga, GET_COINT_HISTORY } from './redux/getCointHistory';
import { getLichSuKhamSaga, GET_LICH_SU_KHAM } from './redux/getLichSuKham';
import { getChiTietLichSuKhamSaga, GET_CHI_TIET_LICH_SU_KHAM } from './redux/getChiTietLichSuKham';
import { getHinhAnhCanLamSangSaga, GET_HINH_ANH_CAN_LAM_SANG } from './redux/getHinhAnhCanLamSang';
import { updateAccountSaga, UPDATE_ACCOUNT } from './redux/updateAccount';
import { updateBHYTSaga, UPDATE_BHYT } from './redux/updateBHYT';
import { createCMTSaga, CREATE_CMT } from './redux/createCMT';
import { CREATE_BHYT, createBHYTSaga } from './redux/createBHYT';
import { getListCitySaga, GET_LIST_CITY } from './redux/getListCity';
import { getListDistrictSaga, GET_LIST_DISTRICT } from './redux/getListDistrict';
import { GET_LIST_WARD, getListWardSaga } from './redux/getListWard';
import { getListNgheNghiepSaga, GET_LIST_NGHE_NGHIEP } from './redux/getListNgheNghiep';
import { getListDanTocSaga, GET_LIST_DAN_TOC } from './redux/getListDanToc';
import { updateKhaiBaoYTeSaga, UPDATE_KHAI_BAO_Y_TE } from './redux/updateKhaiBaoYTe';
import { popupCointSaga, POPUP_COINT } from './redux/popupCoint';

function* watchAll() {
	yield takeLatest(POPUP_COINT, popupCointSaga);

	yield takeLatest(UPDATE_KHAI_BAO_Y_TE, updateKhaiBaoYTeSaga);

	yield takeLatest(GET_LIST_NGHE_NGHIEP, getListNgheNghiepSaga);
	yield takeLatest(GET_LIST_DAN_TOC, getListDanTocSaga);

	yield takeLatest(GET_LIST_DISTRICT, getListDistrictSaga);
	yield takeLatest(GET_LIST_WARD, getListWardSaga);

	yield takeLatest(GET_LIST_CITY, getListCitySaga);

	yield takeLatest(CREATE_CMT, createCMTSaga);
	yield takeLatest(CREATE_BHYT, createBHYTSaga);

	yield takeLatest(UPDATE_BHYT, updateBHYTSaga);

	yield takeLatest(UPDATE_ACCOUNT, updateAccountSaga);
	yield takeLatest(GET_HINH_ANH_CAN_LAM_SANG, getHinhAnhCanLamSangSaga);

	yield takeLatest(GET_CHI_TIET_LICH_SU_KHAM, getChiTietLichSuKhamSaga);

	yield takeLatest(GET_LICH_SU_KHAM, getLichSuKhamSaga);

	yield takeLatest(GET_COINT_HISTORY, getCointHistorySaga);

	yield takeLatest(CREATE_CAP_CUU, createCapCuuSaga);

	yield takeLatest(SEND_MESSAGE_CHAT, sendMessageChatSaga);
	yield takeLatest(SEND_IMAGE_CHAT, sendImageChatSaga);

	yield takeLatest(GET_LIST_CHAT, getListChatSaga);

	yield takeLatest(GET_LIST_DOCTOR, getListDoctorSaga);
	yield takeLatest(GET_DETAIL_APPOINTMENT, getDetailAppointmentSaga);
	yield takeLatest(LOGIN, loginSaga);
	yield takeLatest(SIGNUP_ACCOUNT, signupAccountSaga);
	yield takeLatest(CHECK_ACCOUNT_EXIST, checkAccountExistSaga);
	yield takeLatest(CHECK_PRESENTER, checkPresenterSaga);
	yield takeLatest(DELETE_DEVICE_TOKEN, deleteDeviceTokenSaga);
	yield takeLatest(REGISTER_DEVICE_TOKEN, registerDeviceTokenSaga);
	yield takeLatest(CREATE_APPOINTMENT, createAppointmentSaga);
	yield takeLatest(GET_APPOINTMENT_LIST, getAppointmentListSaga);
	yield takeLatest(GET_HISTORY, getHistorySaga);
	yield takeLatest(CREATE_NEW_EXAMINE_HISTORY, createNewExamineHistorySaga);
	yield takeLatest(DELETE_HISTORY, deleteHistorySaga);
	yield takeLatest(UPDATE_AVATAR, updateAvatarSaga);
	yield takeLatest(DELETE_APPOINTMENT, deleteAppointmentSaga);
	yield takeLatest(SUBCRIBE, subcribeSaga);
	yield takeLatest(GET_NOTIFICATION, getNotificationSaga);
	yield takeLatest(DELETE_SUBCRIBER, deleteSubcriberSaga);
	yield takeLatest(DELETE_NOTIFICATION, deleteNotificationSaga);
	yield takeLatest(DELETE_DETAIL_NOTIFICATION, deleteDetailNotificationSaga);
	yield takeLatest(GET_DETAIL_NOTIFICATION, getDetailNotificationSaga);
	yield takeLatest(GET_USER_INFO, getUserInfoSaga);
	yield takeLatest(CHECK_TOKEN, checkTokenSaga);
	yield takeLatest(SEND_SMS_OTP, sendSMSOTPSaga);
}

export default function* saga() {
	yield all([ watchAll() ]);
}
