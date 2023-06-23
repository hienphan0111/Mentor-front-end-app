import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { addreserve } from '../redux/reservation/reservationSlice';
import { fetchreservation } from '../redux/reservation/reservationSlice';
import DateTimePicker from 'react-datetime-picker';

const initials = {
  datetime: '',
  message: '',
};

function Form() {
  const [state, setState] = useState(initials);
  const Array = useSelector((state) => state.reserveReducer.reserves);
  console.log("check data:", Array)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchreservation());
  }, [dispatch]);
 

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
          <label htmlFor="datetime">Date and Time:</label>
          <DateTimePicker id="datetime" name="datetime" onChange={(value) => handleChange("datetime", value)} value={state.datetime} required/>
        </div>
        <div className="form_item">
          <input type="text" value={state.message} id="message" name="message" placeholder="message" onChange={(e) => handleChange(e.target.name, e.target.value)} required />
        </div>
        <button type="button" onClick={handleSubmit} className="form_button">Submit</button>
      </form>
    
    </div>
  );
};

export default Form;
