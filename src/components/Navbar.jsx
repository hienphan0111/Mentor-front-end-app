import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/mentor.png';
import { logout } from '../redux/userSlice/userSlice';

function Navbar() {
  const { user, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandle = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="w-[20%] h-[100vh]">
      {isLogin && (
        <nav className="flex flex-col justify-between h-full p-5 border border-r-slate-300 shadow-md w-full">
          <div>
            <div className="w-10 h-10">
              <img src={logo} alt="logo" />
            </div>
            <ul className="flex flex-col items-start mt-10 text-lg font-bold uppercase w-full">
              <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                <Link to="/mentors">Mentors</Link>
              </li>
              <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                <Link to="/my-reservations">My reservations</Link>
              </li>
              {user.isAdmin && (
                <>
                  <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                    <Link to="/add-mentor">Add mentor</Link>
                  </li>
                  <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                    <Link to="/add-expertise">Add expertise</Link>
                  </li>
                </>
              )}
              <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                <button className="uppercase" type="button" onClick={logoutHandle}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <div>@2023 Mentor</div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
