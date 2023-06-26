import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import Form from '../components/reservation_form';

function DetailMentor({ id }) {
  const [openModal, setOpenModal] = useState(false);

  const [mentor, setMentor] = useState({
    name: '',
    bio: '',
    photo: '',
    expertise: '',
  });
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetData = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/mentors/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setMentor(res.data);
      console.log(res.data);
    };
    fetData();
  }, [id]);

  const {
    name, bio, photo, contact,
  } = mentor;
  return (
    <div className="flex mt-10">
      <div className="w-[70%]">
        <img src={photo} alt={name} />
      </div>
      <div className="flex flex-col items-end gap-3">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p>{bio}</p>
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
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
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
                  <Form />
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
}

DetailMentor.propTypes = {
  id: PropTypes.number,
};

DetailMentor.defaultProps = {
  id: 1,
};

export default DetailMentor;
