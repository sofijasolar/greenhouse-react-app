import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import mqtt from "mqtt/dist/mqtt";


const mqtt_server = process.env.REACT_APP_MQTT_SERVER; 
const mqtt_username = process.env.REACT_APP_MQTT_USERNAME;
const mqtt_password = process.env.REACT_APP_MQTT_PASSWORD;

let subscribed = false;
const mqtt_options = {
  username: mqtt_username,
  password: mqtt_password,
};

function RealTimeChart({ onDataUpdate }) {
  let tempSeriesArray = [];
  let moistSeriesArray = [];
  let illuminanceSeriesArray = [];
  const [tempSeries, setTempSeries] = useState([0]);
  const [moistSeries, setMoistSeries] = useState([0]);
  const [illuminanceSeries, setIlluminanceSeries] = useState([0]);

  

  const [dataSeries, setDataSeries] = useState([]);
  const [maxMeasurements, setMaxMeasurements] = useState(50);
  //const [timestamps, setTimestamps] = useState([]);

  // Updates the data series

  const updateData = () => {
    setDataSeries([
      {
        name: "Temperature",
        data: tempSeries,
      },
      {
        name: "Moisture",
        data: moistSeries,
      },
      {
        name: "Illuminance",
        data: illuminanceSeries,
      },
    ]);
    //const timestampArray = tempSeriesArray.map((dataPoint) => dataPoint.x);
    //setTimestamps(timestampArray);
    //console.log("dataSeries:", dataSeries);
  };

  useEffect(() => {
    console.log("Connect!");
    const client = mqtt.connect(mqtt_server, mqtt_options);
    client.on("connect", () => {
      // This will be executed twice in debug mode unless we do this trick
      if (!subscribed) {
        subscribed = true;
        console.log("Connected");
        client.subscribe("greenhouseData/id:1");
        client.on("message", (topic, payload, packet) => {
          console.log("Received message:", payload.toString());
          handleMessage(topic, payload);
        });
      }
    });
  }, []);

  // if "tempSeries" is updated, we should also update the graph data
  useEffect(() => {
    //console.log("tempSeries updated:", tempSeries);
    updateData();
  }, [tempSeries]);


  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    // dataLabels: {
    //   enabled: true,
    // }
    noData: {
      text: "Loading...",
    },
    series: [
      {
        name: "Temperature",
        data: tempSeries,
      },
      {
        name: "Moisture",
        data: moistSeries,
      },
      {
        name: "Illuminance",
        data: illuminanceSeries,
      },
    ],
  };
  

  const handleMessage = (topic, message) => {
    let jsonData = JSON.parse(message);
    //let timestamp = Date.now(); // Get the current timestamp (UNIX timestamp in milliseconds)
    // let jsonData;
    // try {
    //   jsonData = JSON.parse(message);
    //   // Validate the received data here
    //   if (typeof jsonData.temperature !== "number" || isNaN(jsonData.temperature)) {
    //     console.error("Invalid temperature data received:", jsonData.temperature);
    //     return;
    //   }
    //   if (typeof jsonData.humidity !== "number" || isNaN(jsonData.humidity)) {
    //     console.error("Invalid humidity data received:", jsonData.humidity);
    //     return;
    //   }
    //   if (typeof jsonData.illuminance !== "number" || isNaN(jsonData.illuminance)) {
    //     console.error("Invalid illuminance data received:", jsonData.illuminance);
    //     return;
    //   }
    // } catch (error) {
    //   console.error("Error parsing received message:", error);
    //   return;
    // }
    // tempSeriesArray.push({ x: timestamp, y: jsonData.temperature });
    // moistSeriesArray.push({ x: timestamp, y: jsonData.humidity });
    // illuminanceSeriesArray.push({ x: timestamp, y: jsonData.illuminance });


    tempSeriesArray.push(jsonData.temperature);
    if (tempSeriesArray.length > maxMeasurements) {
      tempSeriesArray.splice(0, 1);
    }
    moistSeriesArray.push(jsonData.humidity);
    if (moistSeriesArray.length > maxMeasurements) {
      moistSeriesArray.splice(0, 1);
    }
    illuminanceSeriesArray.push(jsonData.illuminance);
    if (illuminanceSeriesArray.length > maxMeasurements) {
      illuminanceSeriesArray.splice(0, 1);
    }

    onDataUpdate({
      temperature: jsonData.temperature,
      humidity: jsonData.humidity,
      illuminance: jsonData.illuminance,
    });
  
    setTempSeries([...tempSeriesArray]);
    setMoistSeries([...moistSeriesArray]);
    setIlluminanceSeries([...illuminanceSeriesArray]);
  };

  return (
    <div className="col p-2 mx-uto">
        <h2>Realtime Data</h2>
      <Chart options={options} series={dataSeries} type="line" height={350} />
    </div>
  );
}

export default RealTimeChart;
