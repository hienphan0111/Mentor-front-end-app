import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../public/mentor.png';
import { logout } from '../redux/userSlice/userSlice';

function Navbar() {
  const { user, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandle = () => {
    dispatch(logout());
  };

  return (
    <div>
      {
      isLogin && (
        <nav className="flex flex-col justify-between h-screen p-5 border border-r-slate-300 shadow-md min-w-fit">
          <div>
            <div className="w-10 h-10">
              <img src={logo} alt="logo" />
            </div>
            <ul className="flex flex-col items-start mt-10 text-lg font-bold uppercase w-full">
              <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                <Link to="/main">Mentors</Link>
              </li>
              <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                <Link to="/reservations">My reservations</Link>
              </li>
              {
                user.isAdmin && (
                  <>

                    <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                      <Link to="/reservations">Add mentor</Link>
                    </li>
                    <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                      <Link to="/reservations">Delete mentor</Link>
                    </li>
                  </>
                )
              }
              <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2">
                <button type="button" onClick={logoutHandle}>Logout</button>
              </li>
            </ul>
          </div>
          <div>
            @2023 Mentor
          </div>
        </nav>
      )
    }
    </div>
  );
}

export default Navbar;
