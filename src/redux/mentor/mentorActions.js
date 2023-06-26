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
