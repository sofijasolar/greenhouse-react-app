import Dashboard from "../components/Dashboard";
import LightChart from "../components/charts/LightChart";
import RealTimeChart from "../components/charts/RealTimeChart";
import SensorDataChart from "../components/charts/SensorDataChart";
import SensorData from "../components/charts/SensorDataChart";
import TemperatureChart from "../components/charts/SensorDataChart";

const HomePage = () => {
    return (
        <div className="mt-5">
        
        <section className="container">
        <h1 className='px-5 py-3 text-start '>Greenhouse Monitoring - Dashboard</h1>    

            <Dashboard/>
        </section>
        </div>
        
    )
}

export default HomePage;