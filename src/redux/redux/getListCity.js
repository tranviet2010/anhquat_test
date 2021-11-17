export const GET_LIST_CITY = 'GET_LIST_CITY';
export const GET_LIST_CITY_ERROR = 'GET_LIST_CITY_ERROR';
export const GET_LIST_CITY_SUCCESS = 'GET_LIST_CITY_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getListCityAction = () => {
	return {
		type: GET_LIST_CITY
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: {},
	canLoadMore: false
};

export const getListCityReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST_CITY:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_LIST_CITY_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_LIST_CITY_SUCCESS:
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

export function* getListCityService() {
	return yield execute('/admin/his/get_list_province', Method.GET);
}

export function* getListCitySaga() {
	try {
		const response = yield getListCityService();
		console.log('getListCity', response);
		if (response.status < 400) {
			if (response.data.code == 200) {
				yield put({
					type: GET_LIST_CITY_SUCCESS,
					data: response.data.data,
					message: response.data.message,
					canLoadMore: false,
					isLoadMore: false
				});
			} else {
				yield put({
					type: GET_LIST_CITY_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: GET_LIST_CITY_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_LIST_CITY_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
