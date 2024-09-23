import { useState } from 'react';
import viteLogo from '/vite.svg';
import SignUp from './Authentication/SignUp/SignUp.jsx';
import Login from './Authentication/Login/Login.jsx';
import Home from './Home/Home.jsx';
import Chat from './Chat/Chat.jsx';
import DetailPost from './DetailPost/DetailPost.jsx';
import Friends from './Friends/Friends.jsx';
import Shorts from './ShortVideos/ShortVideos.jsx';
import Profile from './Profile/Profile.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Home/>
    </>
  )
}

export default App
