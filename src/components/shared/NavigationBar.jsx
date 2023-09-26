import { Link } from "react-router-dom";

const NavigationBar = () => {
    return(
      <div className='container-fluid'>
        
        <nav className='nav'>
          <ul className='nav'>
            <li className='nav-item active p-2'><Link to={"/"}>Home</Link></li>
            <li className='nav-item p-2'><Link to={"realtime"}>Realtime</Link></li>
            <li className='nav-item p-2'><Link to={"last-24"}>Last 24h</Link></li>
          </ul>
        </nav>
      </div>
    )
}

export default NavigationBar;