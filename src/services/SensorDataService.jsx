import React from 'react'
import moment from "moment";

const SensorDataService = (
    () => {

        const endpoint = 'http://localhost:3001/sensor-data'
        
        const getLast24h = async () => {
            const endDate = new Date();
            const startDate = moment(endDate).subtract(1, 'day').toDate(); // modified
            const startDateString = moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ');
            const endDateString = moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ');
            const last24hEndpoint = `${endpoint}?start=${startDateString}&end=${endDateString}`;


            try {
                const response = await fetch(last24hEndpoint);
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const filteredData = data.filter((reading) => {
                  const readingTime = moment(reading.time);
                  return readingTime.isAfter(moment(startDate));
                });
                return filteredData;
              } catch (error) {
                console.error(error);
                return [];
              }
        }



        return {
            getLast24h
        }
        
    }
)();

export default SensorDataService;