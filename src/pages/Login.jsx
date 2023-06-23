import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/userSlice/userSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const dispatch = useDispatch();

  const loginHandle = (values) => {
    dispatch(login(values));
  };

  return (
    <div className="bg-sky-400/25 w-full flex justify-center items-center h-screen">
      <div className="flex flex-col rounded-xl shadow-xl p-4 max-w-2xl bg-slate-100">
        <h2>Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => loginHandle(values)}
        >
          {() => (
            <Form className="flex flex-col gap-2">
              <div className="flex flex-col gap-3">
                <Field name="email" type="email" placeholder="Email" />
                <Field name="password" type="password" placeholder="Password" />
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <button type="submit" className="bg-indigo-400 text-white hover:bg-indio-300 py-2 rounded-md">
                  Log In
                </button>
                <Link
                  href="/register"
                  className="bg-emerald-700 text-white hover:bg-emerald-500 rounded-md py-2 px-2"
                >
                  Do not have account? Register
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
