import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Select from 'react-select';
import { createMentor } from '../redux/mentor/mentorSlice';
import { useEffect } from 'react';
import { fetchExpertises } from '../redux/expertise/expertiseSlice';
import CustomSelect from './CustomSelect';

const mentorSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name too short').required('Name is required'),
  bio: Yup.string().min(10, 'bio should be more than 10 character'),
  photo: Yup.string().required('photo is required'),
  contact: Yup.string().required('contact is required'),
  expertises: Yup.array().min(1).required('Expertises are required'),
});

const AddMentorForm = () => {

  const dispatch = useDispatch();

  const createMentorHandle = (values, helpers) => {
    console.log(values);
    dispatch(createMentor(values));
    helpers.resetForm();
    return;
  }

  const { expertises } = useSelector((state) => state.expertise);

  useEffect(() => {
    dispatch(fetchExpertises());
  }, [dispatch])

  const options = expertises.map((item) => ({ value: item.id, label: item.name }))

  return (
    <div className='min-w-[30%] p-5 bg-sky-200 rounded-md'>
      <h2 className='font-bold text-xl text-lime-700 mb-3'>Add new mentor</h2>
      <Formik
        initialValues={{
          name: '',
          bio: '',
          photo: '',
          contact: '',
          expertises: [],
        }}
        validationSchema={mentorSchema}
        onSubmit={(values, { resetForm }) =>
          createMentorHandle(values, { resetForm })
        }
      >
        {({ errors, touches }) => (
          <Form className='flex flex-col gap-3'>
            <Field
              name='name'
              placeholder='Name'
              className='rounded-md px-2 py-1 text-lg'
            />
            <Field
              as='textarea'
              name='bio'
              placeholder='Input bio of mentor'
              className='rounded-md px-2 py-1 text-lg'
            />
            <Field
              name='photo'
              placeholder='img url'
              className='rounded-md px-2 py-1 text-lg'
            />
            <Field
              name='contact'
              placeholder='Type contact of mentor'
              className='rounded-md px-2 py-1 text-lg'
            />
            <Field
              name="expertises"
              id="expertises"
              placeholder="Seclect expertises"
              isMulti={true}
              component={CustomSelect}
              options={options}
            />
            <button
              type='submit'
              className='bg-yellow-600 hover:bg-yellow-500 hover:-translate-y-1 transition duration-150 text-white py-2 rounded-md text-xl mt-2'
            >
              {' '}
              Add Mentor{' '}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMentorForm;
