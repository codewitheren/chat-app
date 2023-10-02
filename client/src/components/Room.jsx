  import React, {useState, useEffect} from 'react';
  import { FaHome } from 'react-icons/fa';
  import Home from './Home';

  function Room({socket, roomID, username}) {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [showHome, setShowHome] = useState(false);
    const [typing, setTyping] = useState('');

    
    useEffect(() => {
      socket.on('newMessage', (data) => {
      setMessageList((prevMessages) => [...prevMessages, data])
      });
      socket.on('typing', (data) => {
        setTyping(data + ' is typing...');
        setTimeout(() => {
          setTyping('');
        }, 3000);
      });
    }, [socket])

    const sendMessage = (e) => {
      e.preventDefault();
      if (message) {
        const messageData = {
          username: username,
          roomID: roomID,
          message: message,
          time: new Date().getHours() + ':' + new Date().getMinutes()
        };
        socket.emit('sendMessage', messageData);
        setMessageList([...messageList, messageData]);
        setMessage('');
      }
    }

    const goHome = () => {
      setShowHome(true);
      socket.emit('leaveRoom', roomID);
    }

    const sendNewMessage = (e) => {
      setMessage(e.target.value);
      socket.emit('typing', {roomID: roomID, username: username});
    }

    if (showHome) {
      return <Home socket={socket} username={username}/>;
    }

    return (
      <div className='room-page'>
        <div className='room-header'>
          <h2 className='room-title'><span className='room-id'>Room ID:</span> {roomID}</h2>
          <FaHome className='room-link' onClick={goHome}/>
        </div>
        <div className='room-messages-area'>
        {messageList.map((val, key) => {
        const messageClassName = val.username === username ? 'room-message' : 'room-message-other';
        return (
          <div className={messageClassName} key={key}>
            <p className='room-message-user'>{val.username}</p>
            <p className='room-message-text'>{val.message}</p>
            <p className='room-message-time'>{val.time}</p>
          </div>
        )
        })}
        </div>
        <form className='room-messages' onSubmit={sendMessage}>
          <p className='room-typing'>{typing}</p>
          <hr></hr>
          <input type="text" value={message} placeholder='Enter your message...' className='room-input' onChange={sendNewMessage}/>
          <button className='room-btn'>Send</button>
        </form>
      </div>
    );
  }

  export default Room;
