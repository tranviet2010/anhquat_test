export const SUBCRIBE = 'SUBCRIBE';
export const SUBCRIBE_SUCCESS = 'SUBCRIBE_SUCCESS';
export const SUBCRIBE_ERROR = 'SUBCRIBE_ERROR';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { execute, Method } from '../../services/Services';
export const subcribeAction = (body) => {
	return {
		type: SUBCRIBE,
		body
	};
};

const defaultGetFormData = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	canLoadMore: true,
	data: []
};
export const subcribeReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case SUBCRIBE_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case SUBCRIBE_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case SUBCRIBE:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};

export function* subcribeService(body) {
	return yield execute('/account/subscriber', Method.POST, body);
}
export function* subcribeSaga(action) {
	try {
		const response = yield subcribeService(action.body);
		console.log('subcribe', response);
		if (response.status === 200) {
			if (response.data.code == 200) {
				yield put({
					type: SUBCRIBE_SUCCESS,
					data: response.data.subcriber,
					message: response.data.message
				});
			} else {
				yield put({
					type: SUBCRIBE_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: SUBCRIBE_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: SUBCRIBE_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
