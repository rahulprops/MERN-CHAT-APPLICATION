import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NoChat from './pages/NoChat';
import ChatArea from './pages/ChatArea';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<NoChat />} />
          <Route path="profile" element={<Profile />} />
          <Route  path='/chat' element={<ChatArea/>} />
        </Route>
        {/* Auth Pages */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
