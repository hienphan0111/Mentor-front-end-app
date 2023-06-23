import { Link } from 'react-router-dom';
import bgMentor from '../assets/image/bg-mentor.png';

function Welcome() {
  return (
    <div className="bg-gradient-to-t from-sky-600 to-blue-200 w-screen h-screen flex">
      <div className="w-screen h-full relative flex flex-col justify-center items-center">
        <div className="absolute top-50% right-50% opacity-70">
          <img src={bgMentor} alt="bg-mentor" />
        </div>
        <div className="z-20 backdrop-blur-sm flex flex-col items-center">
          <h1 className="font-bold text-6xl text-fuchsia-500">WELCOME TO MENTOR APP</h1>
          <p className="text-4xl text-orange-700 mt-4">push your career to next level</p>
          <div className="flex gap-3 mt-5">
            <Link to="/login" className="bg-slate-200 rounded-md px-3 py-2">
              Sign In
            </Link>
            <Link to="/registration" className="bg-slate-200 rounded-md px-3 py-2">
              Regiter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
