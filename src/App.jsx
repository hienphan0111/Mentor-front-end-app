import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Registration from './pages/Registration';
import MentorForm from './components/mentor_form';
import Welcome from './pages/Welcome';
import Navbar from './components/Navbar';

function ProtectRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

ProtectRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.instanceOf(ReactDOM).isRequired,
};



function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-mentor" element={<MentorForm />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        <Navbar />
        <Routes>
          <Route
            path="/main"
            element={(
              <ProtectRoute isLoggedIn={isLogin}>
                <Home />
              </ProtectRoute>
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
