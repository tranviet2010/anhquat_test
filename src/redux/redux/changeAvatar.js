export const CHANGE_AVATAR = "CHANGE_AVATAR";
export const CHANGE_AVATAR_ERROR = "CHANGE_AVATAR_ERROR";
export const CHANGE_AVATAR_SUCCESS = "CHANGE_AVATAR_SUCCESS";
import { execute, Method } from "../../services/Services";
import { put } from "redux-saga/effects";

export const changeAvatarAction = body => {
  return {
    type: CHANGE_AVATAR,
    body
  };
};

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {}
};

export const changeAvatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_AVATAR:
      return {
        isLoading: true,
        data: {}
      };
    case CHANGE_AVATAR_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.message
      };
    case CHANGE_AVATAR_SUCCESS:
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

export function* changeAvatarService(body) {
  return yield execute("/account/user/update-avatar", Method.POSTFORM, body);
}

export function* changeAvatarSaga(action) {
  try {
		const response = yield changeAvatarService(action.body);
		console.log('changeAvatar', response);
	
			if (response.data.code == 200) {
				yield put({
					type:CHANGE_AVATAR_SUCCESS,
					data: response.data.lich_hen,
					message: response.data.message
				});
			} else {
				yield put({
					type:CHANGE_AVATAR_ERROR,
					message: response.data.message
				});
			}
		} catch (error) {
		yield put({ type:CHANGE_AVATAR_ERROR, error: error });
		if (__DEV__) console.log(error);
	}
}
