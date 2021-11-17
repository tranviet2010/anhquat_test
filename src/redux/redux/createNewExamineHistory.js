export const CREATE_NEW_EXAMINE_HISTORY = "CREATE_NEW_EXAMINE_HISTORY";
export const CREATE_NEW_EXAMINE_HISTORY_ERROR =
  "CREATE_NEW_EXAMINE_HISTORY_ERROR";
export const CREATE_NEW_EXAMINE_HISTORY_SUCCESS =
  "CREATE_NEW_EXAMINE_HISTORY_SUCCESS";
import { execute, Method } from "../../services/Services";
import { put } from "redux-saga/effects";

export const createNewExamineHistoryAction = body => {
  return {
    type: CREATE_NEW_EXAMINE_HISTORY,
    body
  };
};

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {}
};

export const createNewExamineHistoryReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_NEW_EXAMINE_HISTORY:
      return {
        isLoading: true,
        data: {}
      };
    case CREATE_NEW_EXAMINE_HISTORY_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.message
      };
    case CREATE_NEW_EXAMINE_HISTORY_SUCCESS:
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

export function* createNewExamineHistoryService(body) {
  return yield execute("/account/image-history", Method.POSTFORM, body);
}

export function* createNewExamineHistorySaga(action) {
  try {
    const response = yield createNewExamineHistoryService(action.body);
    console.log("createNewExamineHistory", response);
    if (response.status === 200) {
      if (response.data.code == 200) {
        yield put({
          type: CREATE_NEW_EXAMINE_HISTORY_SUCCESS,
          data: response.data.data,
          message: response.data.message
        });
      } else {
        yield put({
          type: CREATE_NEW_EXAMINE_HISTORY_ERROR,
          message: response.data.message
        });
      }
    } else {
      yield put({
        type: CREATE_NEW_EXAMINE_HISTORY_ERROR,
        message: response.data.message
      });
    }
  } catch (error) {
    yield put({ type: CREATE_NEW_EXAMINE_HISTORY_ERROR, error: error });
    if (__DEV__) console.log(error);
  }
}
