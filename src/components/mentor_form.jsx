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
        <label htmlFor="name">
          Name:
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label htmlFor="bio">
          Bio:
          <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <br />
        <label htmlFor="photo">
          Photo:
          <input type="file" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
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
