# greenhouse-react-app

## Greenhouse Monitoring – Frontend solution. 

A website that makes it possible for users to monitor their greenhouse (with real-time graphs) - its temperature, humidity, light and door state.

##  Installation

### 1. Install node_modules
```npm install```

### 2. Setup .env file

In order to run server, you have to setup a MongoDB and provide a login url through .env Create .env file in root directory:
```touch .env```

Add the following environemnt variables to .env:
```
REACT_APP_MQTT_USERNAME="mqtt_username"
REACT_APP_MQTT_PASSWORD="mqtt_password"
REACT_APP_MQTT_SERVER="url to mqtt web sockets"
```

> [!NOTE] Make sure to have your MQTT server and your API running (this is where you gather data from)

### 3. Run the server
```npm start```
