import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import { addreserve } from '../redux/reservation/reservationSlice';
import CSelect from './CSelect';

const DateTimePickerValue = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Select date time to book reservation"
        defaultValue={dayjs('2022-04-17T15:30')}
      />
    </LocalizationProvider>
  );
}

const MakeReservation = ({ mentor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mentors } = useSelector((state) => state.mentor);

  const options = mentors.map((item) => ({ value: item.id, label: item.name }));

  const reservationSubmit = (values, helpers) => {
    let data = {};
    if (values.mentor_id === '') {
      data = {
        ...values,
        mentor_id: mentor.id,
      };
    }
    dispatch(addreserve(data));
    helpers.resetForm();
    navigate('/my-reservations');
  };

  return (
    <div className="px-5">
      <div className="Title">
        Add your reservation
      </div>

      <Formik
        initialValues={{ time: '2019-06-12T14:56:28.176', message: '', mentor_id: '' }}
        onSubmit={(values, { resetForm }) => reservationSubmit(values, { resetForm })}
      >
        {
          () => (
            <Form className="flex flex-col gap-5">
              {
                mentor !== null ? (
                  <>
                    <p className="font-bold text-xl">
                      Mentor:
                      {mentor.name}
                    </p>
                    <Field
                      value={mentor.id}
                      name="mentor_id"
                      className="hidden"
                    />
                  </>
                ) : (
                  <Field
                    name="mentor_id"
                    component={CSelect}
                    isMulti={false}
                    options={options}
                  />
                )
              }
              <Field
                name="time"
                component={DateTimePickerValue}
                label="Select date time to book reservation"
              />
              <Field
                name="message"
                as="textarea"
                placeholder="Please give us more details"
                className="border p-2"
              />
              <button type="submit" className="bg-green-600 text-white py-2 rounded-md">Submit</button>
            </Form>
          )
        }
      </Formik>
    </div>
  );
}

MakeReservation.propTypes = {
  mentor: PropTypes.instanceOf(Object),
};

MakeReservation.defaultProps = {
  mentor: null,
};

export default MakeReservation;
