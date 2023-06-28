import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import Form from '../components/reservation_form';
import { useParams } from 'react-router-dom';

function DetailMentor() {
  const [openModal, setOpenModal] = useState(false);

  const { id } = useParams();
  const { mentors } = useSelector((state) => state.mentor);

  const mentor = mentors.find((item) => item.id === Number(id))

  console.log(mentors, id)

  const { user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const fetData = async () => {
  //     const res = await axios.get(
  //       `http://localhost:3000/api/v1/mentors/${id}`,
  //       { headers: { Authorization: `Bearer ${user.token}` } },
  //     );
  //     setMentor(res.data);
  //   };
  //   fetData();
  // }, [id]);

  const {
    name, bio, photo, contact, expertises
  } = mentor;

  return (
    <div className="flex mt-10 py-14 px-24 gap-10 justify-between w-full">
      <div className="w-[70%]">
        <img src={photo} alt={name} />
      </div>
      <div className="flex flex-col items-end gap-3  w-[15em]">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p>About mentor: {bio}</p>
        {
          expertises.map((epx) => (<p>{epx.name}</p>))
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

// DetailMentor.propTypes = {
//   id: PropTypes.number,
// };

// DetailMentor.defaultProps = {
//   id: 1,
// };

export default DetailMentor;
