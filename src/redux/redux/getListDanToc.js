export const GET_LIST_DAN_TOC = 'GET_LIST_DAN_TOC';
export const GET_LIST_DAN_TOC_ERROR = 'GET_LIST_DAN_TOC_ERROR';
export const GET_LIST_DAN_TOC_SUCCESS = 'GET_LIST_DAN_TOC_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getListDanTocAction = () => {
	return {
		type: GET_LIST_DAN_TOC
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {},
	canLoadMore: false
};

export const getListDanTocReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST_DAN_TOC:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_LIST_DAN_TOC_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_LIST_DAN_TOC_SUCCESS:
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

export function* getListDanTocService() {
	return yield execute('/admin/his/get_list_nation', Method.GET);
}

export function* getListDanTocSaga() {
	try {
		const response = yield getListDanTocService();
		console.log('getListDanToc', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: GET_LIST_DAN_TOC_SUCCESS,
					data: response.data.data,
					message: response.data.message,
					canLoadMore: false,
					isLoadMore: false
				});
			} else {
				yield put({
					type: GET_LIST_DAN_TOC_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_LIST_DAN_TOC_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_LIST_DAN_TOC_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
