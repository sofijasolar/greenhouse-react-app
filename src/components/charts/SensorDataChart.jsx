import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import SensorDataService from "../../services/SensorDataService";


function SensorDataChart() {
  const [sensorData, setSensorData] = useState([]);
  const [tempSeries, setTempSeries] = useState([]);
  const [illuminanceSeries, setIlluminanceSeries] = useState([]);

  const [chart1Data, setChart1Data] = useState({
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
      }
    ]
  });
  const [chart2Data, setChart2Data] = useState({
    options: {
      xaxis: {
        type: 'datetime',
        categories: []
      },
      yaxis: {
        min: 0,
        max: 100
      }
    },
    series: [
      {
        name: 'Humidity',
        data: []
      }
    ]
  });
  const [chart3Data, setChart3Data] = useState({
    options: {
      xaxis: {
        type: 'datetime',
        categories: []
      },
      yaxis: {
        min: 0,
        max: 100000
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
      const temperatureData = data.map((reading) => reading.temperature);
      const humidityData = data.map((reading) => reading.humidity);
      const illuminanceData = data.map((reading) => reading.illuminance);

        setChart1Data({
          options: {
            xaxis: {
              type: 'datetime',
              categories: categories
            },
            yaxis: {
              min: 0,
              max: 50
            }
          },
          series: [
            {
              name: 'Temperature',
              data: temperatureData
            }
          ]
        });
        setChart2Data({
          options: {
            xaxis: {
              type: 'datetime',
              categories: categories
            },
            yaxis: {
              min: 0,
              max: 100
            }
          },
          series: [
            {
              name: 'Humidity',
              data: humidityData
            }
          ]
        });
        setChart3Data({
          options: {
            xaxis: {
              type: 'datetime',
              categories: categories
            },
            yaxis: {
              min: 0
            }
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

  if (!chart1Data.series[0].data.length) {
    return <div>Loading...</div>;
  }
  if (!chart2Data.series[0].data.length) {
    return <div>Loading...</div>;
  }
  if (!chart3Data.series[0].data.length) {
    return <div>Loading...</div>;
  }
  

  // const options = {
  //   chart: {
  //     type: "line",
  //     height: 350,
  //   },
  //   xaxis: {
  //     type: "datetime",
  //     labels: {
  //       format: "yyyy-MM-dd HH:mm:ss",
  //     },
  //   },
  //   yaxis: {
  //     min: 0,
  //     max: 10000,
  //   },
  // };

  // const chartOptions = {
  //   chart: {
  //     type: "line",
  //     height: 350,
  //   },
  //   xaxis: {
  //     type: "datetime",
  //     labels: {
  //       format: "yyyy-MM-dd HH:mm:ss",
  //     },
  //   },
  // };


  return (
    <div className=" col-sm-6 col-md-6 col-lg-6 p-2">
      <h2>Sensor Data last 24 h</h2>
      <ReactApexChart options={chart1Data.options} series={chart1Data.series} type="line" height={160} />
      <ReactApexChart options={chart2Data.options} series={chart2Data.series} type="line" height={160} />
      <ReactApexChart options={chart3Data.options} series={chart3Data.series} type="line" height={160} />

    </div>
  );
}

export default SensorDataChart;