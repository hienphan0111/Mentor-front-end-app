import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/userSlice/userSlice';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name too short')
    .max(50, 'Name too long')
    .required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(6, 'Password is too short - should be 6 chars minimum')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirm password does not match')
    .required('Confirm password is required'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
});

function Registration() {
  const dispatch = useDispatch();
  const signUp = (values) => {
    dispatch(register(values));
    return <Navigate replace to="/mentors" />;
  };

  return (
    <div className="bg-sky-500/50 w-full h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col shadow-xl rounded-xl p-5 gap-3 bg-slate-100 max-w-1xl h-max">
        <h1 className="text-xl font-bold text-teal-700">Sign up</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => signUp(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col gap-2">
                <Field name="name" placeholder="Name" />
                {ErrorMessage.name && touched.name ? (
                  <div>{errors.name}</div>
                ) : null}
                <Field name="email" type="email" placeholder="Email" />
                {ErrorMessage.email && touched.email ? (
                  <div>{errors.name}</div>
                ) : null}
                <Field name="password" type="password" placeholder="Password" />
                {ErrorMessage.email && touched.email ? (
                  <div>{errors.name}</div>
                ) : null}
                <Field name="confirmPassword" type="password" plcaeholder="Confirm Password" />
                {ErrorMessage.email && touched.email ? (
                  <div>{errors.name}</div>
                ) : null}
              </div>
              <div>
                <Field name="acceptTerms" id="acceptTerms" type="checkbox" />
                <span>I have read and agree to the Terms</span>
                {ErrorMessage.acceptTerms && touched.acceptTerms ? (
                  <div>{errors.name}</div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <button type="submit" className="rounded-md bg-indigo-500 py-2 text-slate-100 hover:bg-indigo-300"> Register</button>
                <Link href="/login" className="rounded-md bg-sky-600 py-2 text-slate-100">Have account? Sign In</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
