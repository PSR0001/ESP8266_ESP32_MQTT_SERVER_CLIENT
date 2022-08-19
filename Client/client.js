'use strict'

const mqtt = require('mqtt')

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'ws://localhost:1880'

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
  client.subscribe('topic', { qos: 0 })
  client.subscribe('topic', { qos: 1 })
  client.publish('topic', 'wss secure connection demo...!', { qos: 0, retain: false })
})

client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
})

client.on('close', function () {
  console.log(clientId + ' disconnected')
})