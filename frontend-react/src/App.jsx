import SignUp from './Authentication/SignUp/SignUp.jsx';
import Login from './Authentication/Login/Login.jsx';
import Home from './Home/Home.jsx';
import Chat from './Chat/Chat.jsx';
import Friends from './Friends/Friends.jsx';
import Shorts from './ShortVideos/ShortVideos.jsx';
import Profile from './Profile/Profile.jsx';
import Wrapper from './wrapper.jsx';

import { Routes, Route } from 'react-router-dom';

export default function App() {

  return (
   <Routes>
    <Route path="/" element={<Wrapper />}>
      <Route index element={<Home />} />
      <Route path=":uuid" element={<Home />} />
      <Route path="posts/:idKey" element={<Home />} />
      <Route path="friends" element={<Friends />} />
      <Route path="videos" element={<Shorts />} />
      <Route path="videos/:uuid" element={<Shorts />} />
      <Route path="videos/user/:idKey" element={<Shorts />} />
      <Route path="chat" element={<Chat />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile/:id" element={<Profile />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Route>
  </Routes>
  )
}
