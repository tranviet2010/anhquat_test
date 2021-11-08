export const POPUP_COINT = 'POPUP_COINT';
export const POPUP_COINT_ERROR = 'POPUP_COINT_ERROR';
export const POPUP_COINT_SUCCESS = 'POPUP_COINT_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const popupCointAction = (body) => {
	return {
		type: POPUP_COINT,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {}
};

export const popupCointReducer = (state = initialState, action) => {
	switch (action.type) {
		case POPUP_COINT:
			return {
				isLoading: true,
				data: {}
			};
		case POPUP_COINT_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case POPUP_COINT_SUCCESS:
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

export function* popupCointService(body) {
	return yield execute('/account/coint-code', Method.POST, body);
}

export function* popupCointSaga(action) {
	try {
		const response = yield popupCointService(action.body);
		console.log('popupCoint', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: POPUP_COINT_SUCCESS,
					data: response.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: POPUP_COINT_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: POPUP_COINT_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: POPUP_COINT_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
