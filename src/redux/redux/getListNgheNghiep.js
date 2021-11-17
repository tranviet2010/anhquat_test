export const GET_LIST_NGHE_NGHIEP = 'GET_LIST_NGHE_NGHIEP';
export const GET_LIST_NGHE_NGHIEP_ERROR = 'GET_LIST_NGHE_NGHIEP_ERROR';
export const GET_LIST_NGHE_NGHIEP_SUCCESS = 'GET_LIST_NGHE_NGHIEP_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getListNgheNghiepAction = () => {
	return {
		type: GET_LIST_NGHE_NGHIEP
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {},
	canLoadMore: false
};

export const getListNgheNghiepReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST_NGHE_NGHIEP:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_LIST_NGHE_NGHIEP_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_LIST_NGHE_NGHIEP_SUCCESS:
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

export function* getListNgheNghiepService() {
	return yield execute('/admin/his/get_list_job', Method.GET);
}

export function* getListNgheNghiepSaga() {
	try {
		const response = yield getListNgheNghiepService();
		console.log('getListNgheNghiep', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: GET_LIST_NGHE_NGHIEP_SUCCESS,
					data: response.data.data,
					message: response.data.message,
					canLoadMore: false,
					isLoadMore: false
				});
			} else {
				yield put({
					type: GET_LIST_NGHE_NGHIEP_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_LIST_NGHE_NGHIEP_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_LIST_NGHE_NGHIEP_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
