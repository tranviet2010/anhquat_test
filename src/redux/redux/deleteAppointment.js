export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT';
export const DELETE_APPOINTMENT_ERROR = 'DELETE_APPOINTMENT_ERROR';
export const DELETE_APPOINTMENT_SUCCESS = 'DELETE_APPOINTMENT_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const deleteAppointmentAction = (id) => {
	return {
		type: DELETE_APPOINTMENT,
		id
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const deleteAppointmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_APPOINTMENT:
			return {
				isLoading: true,
				data: {}
			};
		case DELETE_APPOINTMENT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case DELETE_APPOINTMENT_SUCCESS:
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

export function* deleteAppointmentService(id) {
	console.log('Service', id);
	return yield execute('/account/lich_hen/' + id, Method.PUT, {});
}

export function* deleteAppointmentSaga(action) {
	try {
		const response = yield deleteAppointmentService(action.id);
		console.log('deleteAppointment', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: DELETE_APPOINTMENT_SUCCESS,
					data: response.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: DELETE_APPOINTMENT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: DELETE_APPOINTMENT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: DELETE_APPOINTMENT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
