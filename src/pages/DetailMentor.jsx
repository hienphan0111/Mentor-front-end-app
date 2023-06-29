import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { useParams, Link } from 'react-router-dom';
import { BsCaretLeft } from 'react-icons/bs';
import MakeReservation from '../components/MakeReservation';

const DetailMentor = () => {
  const [openModal, setOpenModal] = useState(false);

  const { id } = useParams();
  const { mentors } = useSelector((state) => state.mentor);

  const mentor = mentors.find((item) => item.id === Number(id));

  const {
    name, bio, photo, contact, expertises,
  } = mentor;

  return (
    <div className="flex mt-10 py-14 px-24 gap-10 justify-between w-full relative">
      <div className="w-[70%]">
        <img src={photo} alt={name} />
      </div>
      <div className="bg-lime-500 flex justify-center items-center pl-5 text-white text-xl w-16 h-14 rounded-r-full absolute left-0 top-[80%] cursor-pointer">
        <Link to="/mentors">
          <BsCaretLeft />
        </Link>
      </div>
      <div className="flex flex-col items-end gap-3  w-[15em]">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p>
          About mentor:
          {bio}
        </p>
        <p>Expertises: </p>
        {
          expertises.map((epx) => (<p key={epx.id}>{epx.name}</p>))
        }
        <p>
          Contact:
          {contact}
        </p>
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-green-500 px-3"
        >
          Make a reservation
        </Button>
        {openModal ? (
          <div className="flex justify-center items-center backdrop-blur overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative min-w-4xl my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-end p-5 border-b border-solid border-gray-300 rounded-t ">
                  <button
                    type="button"
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setOpenModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <MakeReservation mentor={mentor} />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DetailMentor;
