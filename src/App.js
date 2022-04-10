import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
