import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCaretLeft, BsCaretRight } from 'react-icons/bs';
import { fetchMentors } from '../redux/mentor/mentorSlice';
import MentorCard from '../components/MentorCard';

const Mentors = () => {
  const dispatch = useDispatch();
  const { mentors } = useSelector((state) => state.mentor);
  const [mentorsSlide, setMentorsSlide] = useState(mentors.slice(0, 3));

  useEffect(() => {
    dispatch(fetchMentors());
  }, [dispatch]);

  const [keyIndex, setKeyIndex] = useState(0);

  const nextSlide = () => {
    if (keyIndex < mentors.length - 3) {
      setKeyIndex(keyIndex + 1);
      setMentorsSlide(mentors.slice(keyIndex, keyIndex + 3));
    }
  };

  const prevSlide = () => {
    if (keyIndex > 0) {
      setKeyIndex(keyIndex - 1);
      setMentorsSlide(mentors.slice(keyIndex, keyIndex + 3));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="my-10">
        <h1 className="font-extrabold text-2xl">THE LASTEST MENTORS</h1>
        <p>Please select a mentor for more details</p>
      </div>
      <hr className="w-[150px] mb-10" />
      <div className="relative w-full">
        <div className="flex h-max-[50%] m-10">
          {
            mentorsSlide.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))
          }
        </div>
        {
          keyIndex < mentors.length - 3 ? (
            <div className="bg-lime-500 flex justify-center transition duration-300 ease-linear items-center pr-5 text-white text-xl w-16 h-14 rounded-l-full absolute right-0 top-[50%] cursor-pointer">
              <button type="button" onClick={nextSlide}>
                <BsCaretRight />
              </button>
            </div>
          ) : null
        }
        {
          keyIndex === 0 ? null : (
            <div className="bg-lime-500 flex justify-center items-center pl-5 text-white text-xl w-16 h-14 rounded-r-full absolute left-0 top-[50%] cursor-pointer">
              <button type="button" onClick={prevSlide}>
                <BsCaretLeft />
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Mentors;
