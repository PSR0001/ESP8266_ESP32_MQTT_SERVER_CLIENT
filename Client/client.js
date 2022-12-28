'use strict'

const mqtt = require('mqtt')

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'tcp://5.196.95.208'
// const host = 'ws://127.0.0.1:1883'

// let sendMessage=process.argv[2]


const options = {
  keepalive: 30,
  clientId: clientId,
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

console.log('connecting mqtt client')


const client = mqtt.connect(host, options)

client.on('error', function (err) {
  console.log(err)
  client.end()
})

client.on('connect', function () {
  console.log('client connected:' + clientId)
  // console.log("");
  client.subscribe('device/123output', { qos: 0 },(sub_message)=>{
      console.log("Message From Server : "+sub_message);
  })
  // client.subscribe('topic', { qos: 1 })
  //client.publish('topic', sendMessage, { qos: 0, retain: false })
})

client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
  // console.log("\n"+JSON.stringify(packet))
})
//client on
client.on('close', function () {
  console.log(clientId + ' disconnected')
})
