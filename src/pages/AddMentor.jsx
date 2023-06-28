import { useDispatch, useSelector } from 'react-redux';
import AddMentorForm from '../components/AddMentorForm';
import { useEffect } from 'react';
import { fetchMentors, deleteMentor } from '../redux/mentor/mentorSlice';

const AddMentor = () => {
  const { mentors } = useSelector((state) => state.mentor);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  const deleteHandle = (id) => {
    dispatch(deleteMentor(id));
    return true;
  };

  return (
    <div className='flex flex-col items-center w-full py-10'>
      <AddMentorForm />
      <section className='mt-10 border-t w-full p-4'>
        <table className='min-w-full font-light text-sm text-left'>
          <thead className='border-b font-medium'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                Photo
              </th>
              <th scope='col' className='px-6 py-4'>
                Name
              </th>
              <th scope='col' className='px-6 py-4'>
                Bio
              </th>
              <th scope='col' className='px-6 py-4'>
                Expertises
              </th>
              <th scope='col' className='px-6 py-4'>
                Remove
              </th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {mentors.map(({ name, photo, bio, id, expertises }) => (
              <tr
                key={id}
                className='border-b transition duration-200 ease-in-out hover:bg-neutral-100'
              >
                <td className='w-16 h-16 px-4 py-4'>
                  <img src={photo} alt='profile' />
                </td>
                <td className='w-16 h-16 px-4 py-4'>{name}</td>
                <td>{bio}</td>
                <td className='w-fit h-fit flex flex-wrap'>
                  {expertises.map((item) => (
                    <span
                      key={item.id}
                      className='bg-lime-400 text-white px-2 py-1 m-1'
                    >
                      {item.name}
                    </span>
                  ))}
                </td>
                <td className='px-6 py-4'>
                  <button
                    type='button'
                    onClick={() => deleteHandle(id)}
                    className='bg-red-400 text-white px-4 py-2 rounded-md font-medium hover:bg-red-500'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AddMentor;
