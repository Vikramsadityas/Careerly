import { Outlet} from 'react-router-dom'
import './App.css'
import ModernNavbar from './components/Navbar.jsx'
function App() {

  return (
    <>
    
    
    <ModernNavbar/>
    <Outlet />
    
    
    </> )
}

export default App
