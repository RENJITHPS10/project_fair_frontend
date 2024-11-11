
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Pagenotfound from './pages/Pagenotfound'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/projects' element={<Projects/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth register={true} />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='*' element={<Pagenotfound/>} />
      

    </Routes>
    <Footer/>
 
    </>
  )
}

export default App
