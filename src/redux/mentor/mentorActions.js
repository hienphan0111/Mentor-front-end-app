import axios from 'axios';

export const createMentorSuccess = (data) => ({
  type: 'CREATE_MENTOR_SUCCESS',
  payload: data,
});

export const createMentorFailure = (error) => ({
  type: 'CREATE_MENTOR_FAILURE',
  payload: error,
});
export const createMentor = (mentorData) => (dispatch) => {
  axios
    .post('/api/mentors', mentorData)
    .then((response) => {
      dispatch(createMentorSuccess(response.data));
    })
    .catch((error) => {
      dispatch(createMentorFailure(error));
    });
};

export const fetchMentorSuccess = (data) => ({
  type: 'FETCH_MENTOR_SUCCESS',
  payload: data,
});

export const fetchMentorFailure = (error) => ({
  type: 'FETCH_MENTOR_FAILURE',
  payload: error,
});

export const fetchMentor = () => (dispatch) => {
  axios
    .get('/api/mentors')
    .then((response) => {
      // Dispatch success action
      dispatch(fetchMentorSuccess(response.data));
    })
    .catch((error) => {
      // Dispatch error action
      dispatch(fetchMentorFailure(error));
    });
};
