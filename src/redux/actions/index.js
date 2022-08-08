export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCSSES = 'REQUEST_SUCSSES';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const USER_LOGIN = 'USER_LOGIN';
const randomNumber = 0.5;

const requestAPI = () => ({
  type: REQUEST_API,
});

const requestSuccess = (obj) => ({
  type: REQUEST_SUCSSES,
  questions: obj.results,
  requestState: obj.response_code,
  randomArray: obj.results.map((question) => [
    question.correct_answer,
    ...question.incorrect_answers].sort(() => Math.random() - randomNumber)),
});

const requestError = () => ({
  type: REQUEST_ERROR,
});

export const requestQuestions = (endPoint) => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const resolve = await fetch(endPoint);
    const data = await resolve.json();
    console.log(data);
    dispatch(requestSuccess(data));
  } catch (error) {
    dispatch(requestError());
  }
};

export const userLoginAction = (state) => ({
  type: USER_LOGIN,
  state,
});
