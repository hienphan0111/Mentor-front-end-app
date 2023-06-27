import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchreservation } from '../redux/reservation/reservationSlice';

function MyReservations() {
  const { reserves, status } = useSelector((state) => state.reservation);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchreservation());
    }
  }, [dispatch]);

  console.log(reserves);
  return (
    <div>
      {
        reserves.length === 0 ? (
          <div>You have no reservations, </div>
        ) : (
          <div>this is reservation</div>
        )
      }
      {/* <ReservationCard /> */}
    </div>
  );
}

export default MyReservations;
