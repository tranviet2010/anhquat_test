export const SEND_SMS_OTP = 'SEND_SMS_OTP';
export const SEND_SMS_OTP_ERROR = 'SEND_SMS_OTP_ERROR';
export const SEND_SMS_OTP_SUCCESS = 'SEND_SMS_OTP_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const sendSMSOTPAction = (body) => {
	return {
		type: SEND_SMS_OTP,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {},
	canLoadMore: false
};

export const sendSMSOTPReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_SMS_OTP:
			return {
				isLoading: true,
				data: state.data
			};
		case SEND_SMS_OTP_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case SEND_SMS_OTP_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: action.data,
				message: action.message
			};
		default:
			return state;
	}
};

export function* sendSMSOTPService(body) {
	return yield execute('sms', Method.POST, body);
}

export function* sendSMSOTPSaga(action) {
	try {
		const response = yield sendSMSOTPService(action.body);
		console.log('sendSMSOTP', response);
		if (response.status < 400) {
			yield put({
				type: SEND_SMS_OTP_SUCCESS,
				data: response.data,
				message: response.data.message
			});
		} else {
			yield put({
				type: SEND_SMS_OTP_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: SEND_SMS_OTP_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
