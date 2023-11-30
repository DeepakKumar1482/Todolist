import {BrowserRouter,Routes,Route}from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './Pages/Login.jsx'
import PublicRoutes from './Pages/PublicRoutes.jsx'
import ProtectedRoutes from './Pages/ProtectedRoutes.jsx'
function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path='/'element={<ProtectedRoutes>{<Home/>}</ProtectedRoutes>}></Route>
          <Route path='/register' element={<PublicRoutes>{<Register/>}</PublicRoutes>}/>
          <Route path='/login'element={<PublicRoutes>{<Login/>}</PublicRoutes>}/>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
