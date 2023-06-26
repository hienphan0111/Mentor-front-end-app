import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMentor } from '../redux/mentor/mentorActions';

function MentorForm() {
  const dispatch = useDispatch();
  const mentor = useSelector((state) => state.mentor);
  const error = useSelector((state) => state.error);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create mentor object
    const mentorData = {
      name,
      bio,
      photo,
      contact,
    };

    // Dispatch createMentor action
    dispatch(createMentor(mentorData));
  };

  return (
    <div className="mentor-form-container w-full h-screen">
      <h1>Create Mentor</h1>
      {error && (
      <p>
        Error:
        {error.message}
      </p>
      )}
      {mentor && (
      <p>
        {mentor.name}
      </p>
      )}
      <form onSubmit={handleSubmit} className="mentor-form flex flex-col justify-center items-center">
        <label htmlFor="name" className="w-full text-center block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 max-w-[400px]">
          Name
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label htmlFor="bio" className="w-full text-center block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 max-w-[400px]">
          Bio
          <textarea id="bio" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <br />
        <label htmlFor="photo" className="w-full block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 max-w-[400px]">
          Photo
          <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        </label>
        <br />
        <label htmlFor="contact" className="w-full block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 max-w-[400px]">
          Contact
          <input type="text" id="contact" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={contact} onChange={(e) => setContact(e.target.value)} />
        </label>
        <br />
        <button type="submit" className="w-full max-w-[400px] shadow bg-purple-500 hover:bg-purple-400 w-full focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">create Mentor</button>
      </form>
    </div>
  );
}

export default MentorForm;
