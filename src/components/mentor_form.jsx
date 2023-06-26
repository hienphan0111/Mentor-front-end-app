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
    <div>
      <h2>Create Mentor</h2>
      {error && (
      <p>
        Error:
        {error.message}
      </p>
      )}
      {mentor && (
      <p>
        Mentor created:
        {mentor.name}
      </p>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          Name:
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label htmlFor="bio" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          Bio:
          <textarea id="bio" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <br />
        <label htmlFor="photo" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          Photo:
          <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        </label>
        <br />
        <label htmlFor="contact">
          Contact:
          <input type="text" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MentorForm;
