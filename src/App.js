import './App.css';
import PostList from './components/PostList'
import RootLayout from './RootLayout';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/postlist" element={<PostList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    
  </Router>
  );
}

export default App;
