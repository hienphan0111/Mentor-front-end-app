import {
  Form, Field, Formik, ErrorMessage,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { createExpertise, deleteExpertise, fetchExpertises } from '../redux/expertise/expertiseSlice';

const expertiseSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name too short').required('Name is required'),
  description: Yup.string()
    .min(10, 'Description is too short')
    .required('description is required'),
  icon: Yup.string().required('Icon is required'),
});

const AddExpertise = () => {
  const [status, setStatus] = useState(null);

  const dispatch = useDispatch();
  const { expertises } = useSelector((state) => state.expertise);

  useEffect(() => {
    dispatch(fetchExpertises());
  }, [dispatch]);

  const addExpertiseHandle = async (values, helpers) => {
    dispatch(createExpertise(values));
    setStatus('ok');
    helpers.resetForm();
  };

  const deleteHandle = (id) => {
    dispatch(deleteExpertise(id));
    return true;
  };

  return (
    <div className="flex items-center mt-10 w-full flex-col">
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
      <section className="mt-10">
        <table className="min-w-full font-light text-sm text-left">
          <thead className="border-b font-medium">
            <tr>
              <th scope="col" className="px-6 py-4">Name</th>
              <th scope="col" className="px-6 py-4">Icon</th>
              <th scope="col" className="px-6 py-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {
              expertises.map(({
                name, icon, description, id,
              }) => (
                <tr key={id} className="border-b transition duration-200 ease-in-out hover:bg-neutral-100">
                  <td>{name}</td>
                  <td className="w-16 h-16 px-4 py-4"><img src={icon} alt="icon" /></td>
                  <td>{description}</td>
                  <td className="px-6 py-4">
                    <button type="button" onClick={() => deleteHandle(id)} className="bg-red-400 text-white px-4 py-2 rounded-md font-medium hover:bg-red-500">Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AddExpertise;
