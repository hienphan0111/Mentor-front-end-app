import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { GiHamburgerMenu } from 'react-icons/gi';
import PropTypes from 'prop-types';
import { logout } from '../redux/userSlice/userSlice';
import logo from '../assets/image/mentor.png';

/* eslint-disable react/jsx-props-no-spreading */

const MenuPopupState = ({ logoutHandle, isAdmin }) => (
  <PopupState variant="popover" popupId="demo-popup-menu">
    {(popupState) => (
      <>
        <Button variant="contained" {...bindTrigger(popupState)}>
          <GiHamburgerMenu style={{ width: '24px', height: '28px' }} />
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}><Link to="/mentors">Mentors</Link></MenuItem>
          <MenuItem onClick={popupState.close}><Link to="/my-reservations">My reservations</Link></MenuItem>
          <MenuItem onClick={popupState.close}>
            <button className="uppercase" type="button" onClick={logoutHandle}>
              Logout
            </button>
          </MenuItem>
          {
            isAdmin && (
              <section>
                <MenuItem onClick={popupState.close}>
                  <Link to="/add-mentor">Add mentor</Link>
                </MenuItem>
                <MenuItem onClick={popupState.close}>
                  <Link to="/add-expertise">Add expertise</Link>
                </MenuItem>
              </section>
            )
          }
        </Menu>
      </>
    )}
  </PopupState>
);

MenuPopupState.propTypes = {
  logoutHandle: PropTypes.func,
  isAdmin: PropTypes.bool,
};

MenuPopupState.defaultProps = {
  logoutHandle: () => null,
  isAdmin: false,
};

const Navbar = () => {
  const { user, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandle = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="md:min-w-[15em] w-fit h-[100vh] relative">
      {isLogin && (
        <nav className="flex-col justify-between h-full p-5 border border-r-slate-300 shadow-md w-full hidden md:flex">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20">
              <img src={logo} alt="logo" className="w-20 h-20" />
            </div>
            <ul className="flex flex-col items-start mt-10 text-lg font-bold uppercase w-full">
              <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2 text-left">
                <Link to="/mentors">Mentors</Link>
              </li>
              <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2 text-left">
                <Link to="/my-reservations">My reservations</Link>
              </li>
              {user.isAdmin && (
                <>
                  <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2 text-left">
                    <Link to="/add-mentor">Add mentor</Link>
                  </li>
                  <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2 text-left">
                    <Link to="/add-expertise">Add expertise</Link>
                  </li>
                </>
              )}
              <li className="hover:bg-lime-500 w-full hover:text-white py-1 px-2 text-left">
                <button className="uppercase" type="button" onClick={logoutHandle}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <div>@2023 Mentor</div>
        </nav>
      )}
      <div className="md:hidden absolute top-5 left-5">
        <MenuPopupState logoutHandle={logoutHandle} isAdmin={user.isAdmin} />
      </div>
    </div>
  );
};

export default Navbar;
