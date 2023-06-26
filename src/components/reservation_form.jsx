import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import { addreserve, fetchreservation } from '../redux/reservation/reservationSlice';

const initials = {
  datetime: '',
  message: '',
};

function Form() {
  const [state, setState] = useState(initials);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setState((prev) => ({
      ...prev, [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addreserve(state));
    setState(initials);
  };

  return (
    <div className="mainform">
      <div className="Line" />
      <div className="Title">
        Add your reservation
      </div>

      <form className="Form" method="post">
        <div className="form_item">
          <p className="time"> Date and Time:</p>
          <DateTimePicker id="datetime" name="datetime" onChange={(value) => handleChange('datetime', value)} value={state.datetime} required />
        </div>
        <div className="form_item">
          <input type="text" value={state.message} id="message" name="message" placeholder="message" onChange={(e) => handleChange(e.target.name, e.target.value)} required />
        </div>
        <button type="button" onClick={handleSubmit} className="form_button">Submit</button>
      </form>

    </div>
  );
}

export default Form;
