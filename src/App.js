import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/shared/NavigationBar';
import RealTimePage from './pages/RealTimePage';
import Last24hPage from './pages/Last24hPage';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css"

//import "./assets/dark-theme.css";


function App() {
  return (
    <>
      <BrowserRouter>
      
        {/* <NavigationBar/> */}
        

        <div className="App">
          <main className='container-fluid'>
            <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='realtime' element={<RealTimePage/>}></Route>
              <Route path='last-24' element={<Last24hPage/>}></Route>
            </Routes>

          </main>
        </div>

      </BrowserRouter>
        
    </>
    
  );
}

export default App;
