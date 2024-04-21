import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import S3 from 'aws-sdk/clients/s3';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [nicImage, setNicImage] = useState(null);
  const [cv, setCv] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/getusers');
      setUsers(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    AWS.config.update({
        accessKeyId: "AKIAV2RCHMNOA3NHYLRM",
        secretAccessKey: "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",
      });
    const s3 = new S3({
        params: { Bucket: "intervee" },
        region: "us-east-1",
      });
    try {
      const imageUpload = await s3.putObject({
        Bucket: "intervee",
        Key: `images/${image.name}`, 
        Body: image,
      }).promise();

    //   const audioUpload = await s3.upload({
    //     ...uploadParams,
    //     Key: `audio/${audio.name}`,
    //     Body: audio,
    //   }).promise();

      const nicImageUpload = await s3.putObject({
        Bucket: "intervee",
        Key: `nic-images/${nicImage.name}`,
        Body: nicImage,
      }).promise();

      const cvUpload = await s3.putObject({
        Bucket: "intervee",
        Key: `cv/${cv.name}`,
        Body: cv,
      }).promise();
      const imageS3Url = `https://intervee.s3.amazonaws.com/images/${image.name}`;
      const nicImageS3Url = `https://intervee.s3.amazonaws.com/nic-images/${nicImage.name}`;
      const cvS3Url = `https://intervee.s3.amazonaws.com/cv/${cv.name}`;
      console.log(imageUpload, nicImageUpload, cvUpload)
      const response = await axios.post('http://localhost:5000/auth/createInterviewee', {
        name,
        email,
        image:imageS3Url,
        nicImage: nicImageS3Url,
        cv: cvS3Url,
      });


      if (response.status === 201) {
        console.log('User created successfully');
        fetchUsers(); 
        setName('');
        setEmail('');
        setImage(null);
        setAudio(null);
        setNicImage(null);
        setCv(null);
        setError('');
        fetchUsers();
      } else {
        console.log(response)
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while creating user');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleNicImageChange = (e) => {
    setNicImage(e.target.files[0]);
  };

  const handleCvChange = (e) => {
    setCv(e.target.files[0]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%', padding: '20px' }}>
        <h2>Users</h2>
        <form style={{ textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }} onSubmit={handleCreateUser}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '5px', marginRight: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '5px', marginRight: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="image">Profile Image:</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ padding: '5px', marginRight: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="audio">Audio:</label>
            <input
              id="audio"
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              style={{ padding: '5px', marginRight: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="nicImage">NIC Image:</label>
            <input
              id="nicImage"
              type="file"
              accept="image/*"
              onChange={handleNicImageChange}
              style={{ padding: '5px', marginRight: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="cv">CV:</label>
            <input
              id="cv"
              type="file"
              accept="application/pdf,.doc,.docx"
              onChange={handleCvChange}
              style={{ padding: '5px', marginRight: '10px' }}
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Create User</button>
        </form>
      </div>
      <div style={{ width: '50%', padding: '20px' }}>
        <h2>Previous Users</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Image</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Audio</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>NIC Image</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>CV</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <img src={user.image} alt="User" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <audio controls>
                    <source src={user.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <img src={user.nicImage} alt="NIC" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <a href={user.cv} target="_blank" rel="noopener noreferrer">View CV</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;