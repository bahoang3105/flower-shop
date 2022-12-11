import { put, takeLatest } from 'redux-saga/effects';
import { getTopicListStart, getTopicListSuccess } from './slice';

function* getTopicListSaga(action: any): any {
  try {
    console.log(action.payload);
    const response = yield console.log(action.payload);
    if (response?.meta?.code === 0) {
      yield put(getTopicListSuccess(response?.data));
    }
  } catch (e) {}
}

function* watchTopicSaga() {
  yield takeLatest(getTopicListStart, getTopicListSaga);
}

export default watchTopicSaga;
