import React from 'react'
import SensorData from '../components/charts/SensorDataChart'
import TempHumChart from '../components/charts/TempHumChart'
import LightChart from '../components/charts/LightChart'

function Last24hPage() {
  return (
    <section className='row m-2 '>
        <h1>Last 24 hours</h1>
        {/* <SensorData/> */}
        <TempHumChart/>
        <LightChart/>
    </section>
  )
}

export default Last24hPage