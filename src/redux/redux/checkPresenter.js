export const CHECK_PRESENTER = 'CHECK_PRESENTER';
export const CHECK_PRESENTER_SUCCESS = 'CHECK_PRESENTER_SUCCESS';
export const CHECK_PRESENTER_ERROR = 'CHECK_PRESENTER_ERROR';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { execute, Method } from '../../services/Services';
export const checkPresenterAction = (body) => {
	return {
		type: CHECK_PRESENTER,
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
export const checkPresenterReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case CHECK_PRESENTER_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case CHECK_PRESENTER_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case CHECK_PRESENTER:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};

export function* checkPresenterService(body) {
	return yield execute('/account/check', Method.POST, body);
}
export function* checkPresenterSaga(action) {
	try {
		const response = yield checkPresenterService(action.body);
		console.log('checkPresenter', response);
		if (response.status === 200) {
			if (response.data.code == 200) {
				yield put({
					type: CHECK_PRESENTER_SUCCESS,
					data: response.data.user,
					message: response.data.message
				});
			} else {
				yield put({
					type: CHECK_PRESENTER_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: CHECK_PRESENTER_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: CHECK_PRESENTER_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
