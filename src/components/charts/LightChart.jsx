import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import SensorDataService from "../../services/SensorDataService";


function LightChart() {

  const [sensorData, setSensorData] = useState([]);

  const [chartData, setChartData] = useState({
    options: {
      xaxis: {
        type: 'datetime',
        categories: []
      },
      yaxis: {
        min: 0,
        max: 12000
      }
    },
    series: [
      {
        name: 'Illuminance',
        data: []
      }
    ]
  });

  useEffect(() => {
    SensorDataService.getLast24h().then((data) => {
      const categories = data.map((reading) => moment(reading.time).format('YYYY-MM-DD HH:mm:ss'));
      const illuminanceData = data.map((reading) => reading.illuminance);
        setChartData({
          options: {
            xaxis: {
              type: 'datetime',
              categories: categories
            },
            yaxis: {
              min: 0
            },
            annotations: {
              yaxis: [{
                y: 1000,
                y2: 2500,
                borderColor: '#000',
                fillColor: '#FEB019',
                opacity: 0.2,
                label: {
                  borderColor: '#333',
                  style: {
                    fontSize: '10px',
                    color: '#333',
                    background: '#FEB019',
                  },
                  text: 'Preferred range',
                }
              }]
            },
            stroke: {
              width: 3,
              curve: 'smooth'
            },
            chart: {
              toolbar: {
                show: false
              }
            },
            colors: ['#FFA500']
          },
          series: [
            {
              name: 'Illuminance',
              data: illuminanceData
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
    <div className=" col-sm-6 col-md-6 col-lg-6 p-2 ">
      <h4>Illuminance</h4>
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
}

export default LightChart;