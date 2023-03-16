import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login/Login';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard/*' element={<Dashboard/>}></Route>
        <Route path='/' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
