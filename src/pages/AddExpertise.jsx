import {
  Form, Field, Formik, ErrorMessage,
} from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const expertiseSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name too short').required('Name is required'),
  description: Yup.string()
    .min(10, 'Description is too short')
    .required('description is required'),
  icon: Yup.string().required('Icon is required'),
});

function AddExpertise() {
  const { token } = useSelector((state) => state.user.user);

  const [status, setStatus] = useState(null);

  const addExpertiseHandle = async (values, helpers) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/expertises',
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.status === 200) {
        setStatus('ok');
        helpers.resetForm();
      }
    } catch (error) {
      setStatus('error');
    }
    return status;
  };

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <div className="flex mx-auto flex-col">
        {status === 'ok' ? (
          <div className="text-green-400 mb-3">
            New expertise was added successfully
          </div>
        ) : null}
        <Formik
          initialValues={{ name: '', description: '', icon: '' }}
          validationSchema={expertiseSchema}
          onSubmit={(
            values,
            { setSubmitting, resetForm },
          ) => addExpertiseHandle(
            values,
            { setSubmitting, resetForm },
          )}
        >
          {(error, touched) => (
            <Form className="flex flex-col bg-sky-200 gap-3 p-5 rounded-md shadow-lg w-[320px]">
              <Field
                name="name"
                placeholder="Name"
                className="p-3 rounded-md"
              />
              {ErrorMessage.name && touched ? <div>{error.message}</div> : null}
              <Field
                name="description"
                placeholder="Description"
                className="p-3 rounded-md"
              />
              {ErrorMessage.description && touched ? (
                <div>{error.description}</div>
              ) : null}
              <Field
                name="icon"
                placeholder="Icon Url"
                className="p-3 rounded-md"
              />
              {ErrorMessage.icon && touched ? <div>{error.icon}</div> : null}
              <button
                type="submit"
                className="py-2 px-3 bg-lime-600 text-white rounded-md mt-2 hover:bg-lime-500"
              >
                Add expertise
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddExpertise;
