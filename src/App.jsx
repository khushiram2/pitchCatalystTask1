import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import SubUserContact from './Contract/SubUserContact';
import NewContractForm from './pages/NewContractForm/NewContractForm';
import AllUserDetailsForOneContract from './pages/AllUserDetailsForOneContract/AllUserDetailsForOneContract';
import NewContract from './Contract/new-contract';

function App() {
  return (
    <div className='App'>
    <Routes>
      <Route path='/' element={<Navigate replace to="/login" />}/> 
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path='/new-conract' element={<NewContractForm/>}/>
    <Route path="/contract/:id" element={<AllUserDetailsForOneContract/>}/>
    <Route path="/sub-user/contract/:token" element={<SubUserContact/>}/>
    <Route path='/test/:token' element={<NewContract/>}/>
    </Routes>

    </div>
  )
}

export default App
