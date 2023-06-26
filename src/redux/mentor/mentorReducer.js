const initialState = {
  mentor: null,
  error: null,
};

// eslint-disable-next-line default-param-last
const mentorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_MENTOR_SUCCESS':
      return {
        ...state,
        mentor: action.payload,
        error: null,
      };
    case 'CREATE_MENTOR_FAILURE':
      return {
        ...state,
        mentor: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mentorReducer;
