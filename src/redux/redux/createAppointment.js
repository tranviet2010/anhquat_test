export const CREATE_APPOINTMENT = 'CREATE_APPOINTMENT';
export const CREATE_APPOINTMENT_ERROR = 'CREATE_APPOINTMENT_ERROR';
export const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const createAppointmentAction = (body) => {
	return {
		type: CREATE_APPOINTMENT,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const createAppointmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_APPOINTMENT:
			return {
				isLoading: true,
				data: {}
			};
		case CREATE_APPOINTMENT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case CREATE_APPOINTMENT_SUCCESS:
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

export function* createAppointmentService(body) {
	return yield execute('/account/lich_hen', Method.POST, body);
}

export function* createAppointmentSaga(action) {
	try {
		const response = yield createAppointmentService(action.body);
		console.log('createAppointment', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: CREATE_APPOINTMENT_SUCCESS,
					data: response.data.lich_hen,
					message: response.data.message
				});
			} else {
				yield put({
					type: CREATE_APPOINTMENT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: CREATE_APPOINTMENT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: CREATE_APPOINTMENT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
