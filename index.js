const express = require('express')
const path = require('path');
const mqtt = require('mqtt')
const app = express()
const http = require('http');
const { instrument } = require("@socket.io/admin-ui");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { log } = require('console');
const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  },
});

const port = process.env.PORT || 3000

app.use(express.json());
app.use('/', express.static('public'))


// let client,client2,mqtt_status

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


io.on("connection", (socket) => {
  

    io.emit("subscriver", "connected");
 
  
  console.log(`User with id: ${socket.id} connected!`);

  socket.on("disconnect", () => {
    console.log(`User with id: ${socket.id} disconnected`);
  });

});

//admin-ui
instrument(io, { auth: false });




//HTTP POST request coming ...
app.post('/mqtt_values',(req,res)=>{

const host = req.body.chostype + req.body.cipaddress;

const options = {
  keepalive: 30,
  clientId: req.body.cclientid,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false
}

 let client = mqtt.connect(host, options)
 
client.on('error', function (err) {
  console.log(err)
  res.send({"status": false, "message": err})
  client.end()
})

client.on('connect', function () {
  console.log('client connected:' + req.body.cclientid)
  client.subscribe('mqtt_client', { qos: 0 },(sub_message)=>{
    console.log("Message From Server : "+sub_message);
})
  res.send({"status": true, "message": "Connection SuccessFull."})
})

client.on('message', function (topic, message, packet) {
  io.emit("subscriver", message.toString());
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
})


client.on('close', function () {
  console.log(req.body.cclientid + ' disconnected')
  res.send({"status": false, "message": "Connection Closed."})
})

console.log("hola");

})



