import { FaTwitter, FaInstagram, FaMediumM } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MentorCard = ({ mentor }) => {
  const {
    id, name, bio, photo,
  } = mentor;

  return (
    <div className="flex flex-col items-center mx-auto w-[300px] gap-10">
      <div className="w-36 h-36 rounded-full bg-slate-400 flex justify-center items-center cursor-pointer">
        <Link to={`/mentors/${id}`}>
          <img src={photo} alt="image_profile" className="object-fill rounded-full" />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center divide-y-2 divide-dashed w-[70%]">
          <h1 className="uppercase font-bold text-lg">{name}</h1>
          <hr className="divide-dashed" />
        </div>
        {
          bio.length > 15 ? (
            <p>{bio.slice(0, 55)}</p>
          ) : (<p>{bio}</p>)
        }
        <div className="flex">
          <span className="p-2">
            <FaTwitter className="text-xl  text-[#a7a4a7]  cursor-pointer  " />
          </span>
          <span className="p-2">
            <FaInstagram className="text-xl text-[#a7a4a7] cursor-pointer  " />
          </span>
          <span className="p-2">
            <FaMediumM className="text-xl  text-[#a7a4a7]  cursor-pointer  " />
          </span>
        </div>
      </div>
    </div>
  );
};

MentorCard.propTypes = {
  mentor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    bio: PropTypes.string,
    photo: PropTypes.string,
  }),
};

MentorCard.defaultProps = {
  mentor: {
    id: 0,
    name: '',
    bio: '',
    photo: '',
  },
};

export default MentorCard;
