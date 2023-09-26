import React from 'react'
import RealTimeChart from './charts/RealTimeChart'
import SensorDataChart from './charts/SensorDataChart';
import LightChart from './charts/LightChart';
import TempHumChart from './charts/TempHumChart';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureQuarter, faDroplet, faSun, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import DoorStateComponent from './charts/DoorState';

function Dashboard() {

 // Define state to hold the latest data
  const [latestData, setLatestData] = useState({
    temperature: 0,
    humidity: 0,
    illuminance: 0,
  });

  // Function to update the latest data
  const handleDataUpdate = (data) => {
    setLatestData(data);
  };

  return (
    <section className='row m-2 ' data-theme="dark">
      <div className=' row sparkboxes mt-4'>
      <div className="col-md">
        <div className="box box1 my-1">
          {/* <div className='details'
          //  style={{display: 'contents'}}
           > */}
                {/* <div className="icon">
                  <FontAwesomeIcon icon={faTemperatureQuarter} />
                </div> */}
          {/* </div> */}

            <div className=" text">
            <div className="icon">
                  <FontAwesomeIcon icon={faTemperatureQuarter} />
                </div>
                <div >
                  <h3>{latestData.temperature}°C</h3>
                  <p>Temperature</p>
                </div>
            </div>
        </div>
      </div>
      <div className="col-md">
        <div className="box box2 my-1">
            <div className=" text">
            <FontAwesomeIcon icon={faDroplet} />
              <h3>{latestData.humidity}%</h3>
              <p>Humidity</p>
            </div>
        </div>
      </div>
      <div className="col-md">
        <div className="box box3 my-1">
            <div className=" text">
            <FontAwesomeIcon icon={faSun} />
              <h3>{latestData.illuminance} lux</h3>
              <p>Illuminance</p>
            </div>
        </div>
      </div>
      <div className="col-md">
        <div className="box box4 my-1">
              <DoorStateComponent/>
        </div>
      </div>
        
        
      </div>
      
        <article className=' border p-2 rounded m-2 bg-light' style={{ textAlign: 'center' }}>
            <RealTimeChart
            onDataUpdate={handleDataUpdate}/>
        </article>
        <article className='row border p-2 rounded m-2 bg-light'>
            <h2 className='mb-3'>Sensor data last 24 h</h2>
              <TempHumChart/>
              <LightChart/>
        </article>
        
    </section>
  )
}

export default Dashboard;