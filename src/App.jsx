import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Mentors from './pages/Mentors';
import Registration from './pages/Registration';
import AddMentor from './pages/AddMentor';
import Welcome from './pages/Welcome';
import Navbar from './components/Navbar';
import MyReservations from './pages/MyReservations';
import AddExpertise from './pages/AddExpertise';
import DetailMentor from './pages/DetailMentor';

const ProtectRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

const App = () => {
  const { isLogin } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <div className="flex">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        { isLogin && <Navbar /> }
        <Routes>
          <Route
            path="/add-mentor"
            element={(
              <ProtectRoute isLoggedIn={isLogin}>
                <AddMentor />
              </ProtectRoute>
            )}
          />
          <Route
            path="/mentors"
            element={(
              <ProtectRoute isLoggedIn={isLogin}>
                <Mentors />
              </ProtectRoute>
            )}
          />
          <Route
            path="/mentors/:id"
            element={(
              <ProtectRoute isLoggedIn={isLogin}>
                <DetailMentor />
              </ProtectRoute>
            )}
          />
          <Route
            path="/my-reservations"
            element={(
              <ProtectRoute isLoggedIn={isLogin}>
                <MyReservations />
              </ProtectRoute>
            )}
          />
          <Route
            path="/add-expertise"
            element={(
              <ProtectRoute isLoggedIn={isLogin}>
                <AddExpertise />
              </ProtectRoute>
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
