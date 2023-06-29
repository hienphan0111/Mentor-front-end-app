import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { FaMediumM, FaTwitter, FaInstagram } from 'react-icons/fa';

const Mentor = () => (
  <li
  //   key={mentor.model}
    className="grid grid-rows-2 items-start gap-4 transition-all duration-300 ease-linear"
  >
    {/* <Link to={`/mentors/${mentor.mentor_id}`}
  className="flex flex-col gap-4 items-center"> */}
    <img
      //   src={mentor.image_url}
      //   alt={mentor.name}
      src="https://gravatar.com/avatar/a84f8ed592ad187bbd21422856770c78?s=400&d=robohash&r=x"
      alt="{mentor.name}"
      className="rounded-full aspect-square w-60 "
    />
    {/* </Link> */}
    <section className="flex flex-col gap-4 items-center justify-evenly">
      <h2 className="font-extrabold text-[#645858] text-xl tracking-wider">
        {/* {mentor.contact} */}
        mentor.contact
      </h2>
      <hr className="border-dotted w-full font-bold text-2xl border-[3px]" />
      <p className="text-[#807e80]">
        {/* {mentor.expertises.name} */}
        Frontend developer
      </p>
      <div className="flex gap-4">
        <span className="rounded-full border p-2">
          <FaTwitter className="text-xl  text-[#a7a4a7]  cursor-pointer  " />
        </span>
        <span className="rounded-full border p-2">
          <FaInstagram className="text-xl text-[#a7a4a7] cursor-pointer  " />
        </span>
        <span className="rounded-full border p-2">
          <FaMediumM className="text-xl  text-[#a7a4a7]  cursor-pointer  " />
        </span>
      </div>
    </section>
  </li>
);

export default Mentor;
