export const GET_LIST_DOCTOR = 'GET_LIST_DOCTOR';
export const GET_LIST_DOCTOR_ERROR = 'GET_LIST_DOCTOR_ERROR';
export const GET_LIST_DOCTOR_SUCCESS = 'GET_LIST_DOCTOR_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getListDoctorAction = (body) => {
	return {
		type: GET_LIST_DOCTOR,
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

export const getListDoctorReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST_DOCTOR:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_LIST_DOCTOR_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_LIST_DOCTOR_SUCCESS:
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

export function* getListDoctorService(body) {
	return yield execute('/account/user/list', Method.GET, body);
}

export function* getListDoctorSaga(action) {
	try {
		const response = yield getListDoctorService(action.body);
		console.log('getListDoctor', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: GET_LIST_DOCTOR_SUCCESS,
					data: response.data.data.users,
					message: response.data.message,
					canLoadMore: response.data.pages > response.data.current,
					isLoadMore: action.body.page > 1
				});
			} else {
				yield put({
					type: GET_LIST_DOCTOR_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_LIST_DOCTOR_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_LIST_DOCTOR_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
