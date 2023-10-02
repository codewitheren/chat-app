import { useState } from 'react';
import Room from './Room'; 

export default function Home({ socket }) {
  const [roomID, setRoomID] = useState('');
  const [username, setUsername] = useState('');
  const [showRoom, setShowRoom] = useState(false);

  const joinRoom = async () => {
    if (username === '' || roomID === '')
      return alert('Username and room ID are required');
    socket.emit('room', roomID);
    setShowRoom(true);
  }

  if (showRoom) {
    return <Room socket={socket} roomID={roomID} username={username} />;
  }

  return (
    <div className='home-page'>
      <h1 className='home-h1'>Chat App</h1>
      <form className='home-form'>
        <p className='home-p'>Enter the room number you want to join</p>
        <input
          type="text"
          placeholder='USERNAME'
          value={username}
          className='home-input'
          required
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder='ROOM ID'
          value={roomID}
          className='home-input'
          required
          onChange={e => setRoomID(e.target.value)}
        />
        <button className='home-btn' type="button" onClick={joinRoom}>Join</button>
      </form>
    </div>
  );
}
