import { Outlet} from 'react-router-dom'
import './App.css'
import { NavbarComp } from './components'
function App() {

  return (
    <>
    
    
    <NavbarComp/>
    <Outlet />
    
    
    </> )
}

export default App
