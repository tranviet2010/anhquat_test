export const GET_DETAIL_APPOINTMENT = 'GET_DETAIL_APPOINTMENT';
export const GET_DETAIL_APPOINTMENT_ERROR = 'GET_DETAIL_APPOINTMENT_ERROR';
export const GET_DETAIL_APPOINTMENT_SUCCESS = 'GET_DETAIL_APPOINTMENT_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getDetailAppointmentAction = (id) => {
	return {
		type: GET_DETAIL_APPOINTMENT,
		id
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {},
	canLoadMore: false
};

export const getDetailAppointmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DETAIL_APPOINTMENT:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_DETAIL_APPOINTMENT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_DETAIL_APPOINTMENT_SUCCESS:
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

export function* getDetailAppointmentService(id) {
	return yield execute('/account/lich_hen/' + id, Method.GET);
}

export function* getDetailAppointmentSaga(action) {
	try {
		const response = yield getDetailAppointmentService(action.id);
		console.log('getDetailAppointment', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: GET_DETAIL_APPOINTMENT_SUCCESS,
					data: response.data.lich_hen,
					message: response.data.message
				});
			} else {
				yield put({
					type: GET_DETAIL_APPOINTMENT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_DETAIL_APPOINTMENT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_DETAIL_APPOINTMENT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
