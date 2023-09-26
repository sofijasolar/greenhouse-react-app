import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt/dist/mqtt';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';


const mqtt_server = process.env.REACT_APP_MQTT_SERVER;
const mqtt_username = process.env.REACT_APP_MQTT_USERNAME;
const mqtt_password = process.env.REACT_APP_MQTT_PASSWORD;

let subscribed = false;

const mqtt_options = {
  username: mqtt_username,
  password: mqtt_password,
};

function DoorStateComponent() {
    const [isDataReceived, setIsDataReceived] = useState(false);
    const [doorState, setDoorState] = useState(false);
  
    useEffect(() => {
        const client = mqtt.connect(mqtt_server, mqtt_options);
        client.on('connect', () => {
            if(!subscribed){
                subscribed = true;
                console.log("Connected to mqtt2")
                client.subscribe('greenhouseData/id:1/doorState'); 
                client.on('message', (topic, message) => {
                    //console.log(message.toString());
                    handleMessage(message.toString());
                    setIsDataReceived(true);
                });
            }
        
        });
    }, []);

    const handleMessage = (message) => {
        let jsonData = JSON.parse(message);
        console.log("Door state: " + jsonData.door_state);
        if ( jsonData.door_state == "open"){
            setDoorState(true);
        }else{
            setDoorState(false);
        }
    };

    return (
        <div className='text'>
            <FontAwesomeIcon icon={doorState ? faDoorOpen : faDoorClosed} />
        <h3>{isDataReceived ? (doorState ? 'Open' : 'Closed') : 'Loading..'}</h3>
        <p>Doors</p>
        </div>
    );
}

export default DoorStateComponent;
