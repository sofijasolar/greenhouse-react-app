import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import SensorDataService from "../../services/SensorDataService";


function TempHumChart() {
  const [sensorData, setSensorData] = useState([]);
  const [chartData, setChartData] = useState({
    options: {
      xaxis: {
        type: 'datetime',
        categories: []
      },
      yaxis: {
        min: 0,
        max: 50
      }
    },
    series: [
      {
        name: 'Temperature',
        data: []
      },
      {
        name: 'Humidity',
        data: []
      }
    ]
  });

  useEffect(() => {
    SensorDataService.getLast24h().then((data) => {
      const categories = data.map((reading) => moment(reading.time).format('YYYY-MM-DD HH:mm:ss'));
      const temperatureData = data.map((reading) => reading.temperature);
      const humidityData = data.map((reading) => reading.humidity);
        setChartData({
          options: {
            chart: {
              toolbar: {
                show: false
              }
            },
            xaxis: {
              type: 'datetime',
              categories: categories
            },
            yaxis: {
              min: 0
            },
            stroke: {
              width: 3,
              curve: 'smooth'
            }
          },
          series: [
            {
              name: 'Temperature',
              data: temperatureData
            },
            {
              name: 'Humidity',
              data: humidityData
            }
          ]
        });
        setSensorData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!chartData.series[0].data.length) {
    return <div>Loading...</div>;
  }


  return (
    <div className="col-sm-6 col-md-6 col-lg-6 p-2">
      <h4>Temperature and humidity</h4>
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
}

export default TempHumChart;