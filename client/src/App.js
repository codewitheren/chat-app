import Home from './components/Home';
import './App.css';
import io from 'socket.io-client';

function App() {
  const socket = io('http://192.168.1.40:5000');

  return (
    <>
      <Home socket={socket}/>
    </>
  );
}

export default App;
