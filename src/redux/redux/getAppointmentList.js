export const GET_APPOINTMENT_LIST = 'GET_APPOINTMENT_LIST';
export const GET_APPOINTMENT_LIST_ERROR = 'GET_APPOINTMENT_LIST_ERROR';
export const GET_APPOINTMENT_LIST_SUCCESS = 'GET_APPOINTMENT_LIST_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getAppointmentListAction = (body) => {
	return {
		type: GET_APPOINTMENT_LIST,
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

export const getAppointmentListReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENT_LIST:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_APPOINTMENT_LIST_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_APPOINTMENT_LIST_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: action.isLoadMore ? [ ...state.data, ...action.data ] : action.data,
				message: action.message
			};
		default:
			return state;
	}
};

export function* getAppointmentListService(body) {
	return yield execute('/account/lich_hen', Method.GET, body);
}

export function* getAppointmentListSaga(action) {
	try {
		const response = yield getAppointmentListService(action.body);
		console.log('getAppointmentList', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: GET_APPOINTMENT_LIST_SUCCESS,
					data: response.data.lich_hens,
					message: response.data.message,
					canLoadMore: response.data.pages > response.data.current,
					isLoadMore: action.body.page > 1
				});
			} else {
				yield put({
					type: GET_APPOINTMENT_LIST_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_APPOINTMENT_LIST_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_APPOINTMENT_LIST_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
