export const UPDATE_AVATAR = 'UPDATE_AVATAR';
export const UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS';
export const UPDATE_AVATAR_ERROR = 'UPDATE_AVATAR_ERROR';
import { put } from 'redux-saga/effects';
import MAsyncStorage from '../../utilities/MAsyncStorage';
import { execute, Method } from '../../services/Services';
export const updateAvatarAction = (body) => {
	return {
		type: UPDATE_AVATAR,
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
export const updateAvatarReducer = (state = defaultGetFormData, action) => {
	switch (action.type) {
		case UPDATE_AVATAR_SUCCESS:
			return {
				data: action.data,
				isLoading: false,
				isSuccess: true,
				isError: false,
				message: action.message
			};
		case UPDATE_AVATAR_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				isSuccess: false,
				message: action.message
			};
		case UPDATE_AVATAR:
			return {
				data: {},
				isLoading: true
			};
		default:
			return state;
	}
};

export function* updateAvatarService(body) {
	return yield execute('/account/user/update-avatar', Method.POSTFORM, body);
}
export function* updateAvatarSaga(action) {
	try {
		const response = yield updateAvatarService(action.body);
		console.log('updateAvatar', response);
		if (response.status === 200) {
			if (response.data.code == 200) {
				yield put({
					type: UPDATE_AVATAR_SUCCESS,
					data: response.data.data,
					message: response.data.message
				});
			} else {
				yield put({
					type: UPDATE_AVATAR_ERROR,
					message: response.data.message
				});
			}
		} else {
			yield put({
				type: UPDATE_AVATAR_ERROR,
				message: response.data.message
			});
		}
	} catch (error) {
		yield put({ type: UPDATE_AVATAR_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
