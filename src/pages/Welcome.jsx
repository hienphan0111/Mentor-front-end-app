import { Link } from 'react-router-dom';
import bg2 from '../assets/image/bg-2.png';

function Welcome() {
  return (
    <div className="bg-gradient-to-t from-[#a18cd1] to-[#fbc2eb] w-screen h-screen flex">
      <div className="w-screen h-full relative flex flex-col justify-center items-center">
        <div className="absolute top-50% right-50% opacity-70">
          <img src={bg2} alt="bg-mentor" />
        </div>
        <div className="z-20 backdrop-blur-sm flex flex-col items-center">
          <h1 className="font-bold text-6xl text-yellow-600">WELCOME TO MENTOR APP</h1>
          <p className="text-4xl text-white mt-4">push your career to next level</p>
          <div className="flex gap-3 mt-5">
            <Link to="/login" className="bg-lime-600 rounded-md px-5 py-2 text-white hover:-translate-y-1">
              Sign In
            </Link>
            <Link to="/registration" className="bg-slate-200 rounded-md px-5 py-2 hover:-translate-y-1">
              Regiter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
