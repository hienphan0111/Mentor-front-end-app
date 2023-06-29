import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { fetchreservation, removereservation } from '../redux/reservation/reservationSlice';
import MakeReservation from '../components/MakeReservation';

const MyReservations = () => {
  const { reserves } = useSelector((state) => state.reservation);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchreservation());
  }, [dispatch]);

  const deleteHandle = (id) => {
    dispatch(removereservation(id));
  };

  return (
    <div className="w-full">
      <div className="flex justify-center font-bold text-2xl w-full my-14 relative">
        <h2>Your reservations</h2>
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-green-500 px-3 text-xl absolute top-10 right-10"
        >
          Make a reservation
        </Button>
      </div>
      <hr />
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
                <MakeReservation />
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
      {
        reserves.length === 0 ? (
          <div className="mt-5">You have no reservations, </div>
        ) : (
          <section className="mt-10 mx-10">
            <table className="min-w-full font-light text-sm text-left">
              <thead className="border-b font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4">ID</th>
                  <th scope="col" className="px-6 py-4">Mentor</th>
                  <th scope="col" className="px-6 py-4">Time</th>
                  <th scope="col" className="px-6 py-4">Message</th>
                  <th scope="col" className="px-6 py-4">Cancel</th>
                </tr>
              </thead>
              <tbody>
                {
                  reserves.map(({
                    id, mentor, time, message,
                  }) => (
                    <tr key={id} className="border-b transition duration-200 ease-in-out hover:bg-neutral-100">
                      <td className="flex px-4 items-center py-5">{id}</td>
                      <td className="w-16 h-16 px-4 py-4">{mentor.name}</td>
                      <td>{time}</td>
                      <td>{message}</td>
                      <td className="px-6 py-4">
                        <button type="button" onClick={() => deleteHandle(id)} className="bg-red-400 text-white px-4 py-2 rounded-md font-medium hover:bg-red-500">Cancel</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </section>
        )
      }
    </div>
  );
};

export default MyReservations;
