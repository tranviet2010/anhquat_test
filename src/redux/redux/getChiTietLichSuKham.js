export const GET_CHI_TIET_LICH_SU_KHAM = 'GET_CHI_TIET_LICH_SU_KHAM';
export const GET_CHI_TIET_LICH_SU_KHAM_ERROR = 'GET_CHI_TIET_LICH_SU_KHAM_ERROR';
export const GET_CHI_TIET_LICH_SU_KHAM_SUCCESS = 'GET_CHI_TIET_LICH_SU_KHAM_SUCCESS';
import { execute, Method } from '../../services/Services';
import { put } from 'redux-saga/effects';

export const getChiTietLichSuKhamAction = (body) => {
	return {
		type: GET_CHI_TIET_LICH_SU_KHAM,
		body
	};
};

const initialState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	data: [],
	canLoadMore: false
};

export const getChiTietLichSuKhamReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CHI_TIET_LICH_SU_KHAM:
			return {
				isLoading: true,
				data: state.data
			};
		case GET_CHI_TIET_LICH_SU_KHAM_ERROR:
			return {
				...state,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.message
			};
		case GET_CHI_TIET_LICH_SU_KHAM_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: action.isLoadMore ? [ ...state.data, ...action.data ] : action.data,
				message: action.message,
				canLoadMore: action.canLoadMore
			};
		default:
			return state;
	}
};

export function* getChiTietLichSuKhamService(body) {
	return yield execute('/account/lich_kham/get_detail_examination', Method.POST, body);
}

export function* getChiTietLichSuKhamSaga(action) {
	try {
		const response = yield getChiTietLichSuKhamService(action.body);
		console.log('getChiTietLichSuKham', response);
		if (response.data.code == 200) {
			yield put({
				type: GET_CHI_TIET_LICH_SU_KHAM_SUCCESS,
				data: response.data.data,
				message: response.data.message
				// canLoadMore:
				// 	response.data.data.length > 0
				// 		? response.data.data[0].phan_trang.tong_so_trang >
				// 			response.data.data[0].phan_trang.trang_hien_tai
				// 		: false,
				// isLoadMore: action.body.phan_trang.trang_hien_tai > 1
			});
		} else {
			yield put({
				type: GET_CHI_TIET_LICH_SU_KHAM_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: GET_CHI_TIET_LICH_SU_KHAM_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
