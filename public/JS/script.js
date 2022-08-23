// const mqtt =require("https://unpkg.com/mqtt/dist/mqtt.min.js")

'use strict'

const client = new Paho.MQTT.Client("ws://iot.eclipse.org/ws", "myClientId" + new Date().getTime());

const myTopic = "demo_topic";

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({ onSuccess: onConnect });

let count = 0;
function onConnect() {
  console.log("onConnect");
  client.subscribe(myTopic);
  setInterval(() => { publish(myTopic, `The count is now ${count++}`) }, 1000)

}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
  client.connect({ onSuccess: onConnect });
}

const publish = (dest, msg) => {
  console.log('desint :', dest, 'msggg', msg)
  let message = new Paho.MQTT.Message(msg);
  message.destinationName = dest;
  client.send(message);
}

function onMessageArrived(message) {
  let el = document.createElement('div')
  el.innerHTML = message.payloadString
  document.body.appendChild(el)
}





// const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

// const host = 'ws://5.196.95.208'
// // const host = 'ws://127.0.0.1:1883'

// // let sendMessage=process.argv[2]


// const options = {
//   keepalive: 30,
//   clientId: clientId,
//   protocolId: 'MQTT',
//   protocolVersion: 4,
//   clean: true,
//   reconnectPeriod: 1000,
//   connectTimeout: 30 * 1000,
//   will: {
//     topic: 'WillMsg',
//     payload: 'Connection Closed abnormally..!',
//     qos: 0,
//     retain: false
//   },
//   rejectUnauthorized: false
// }

// console.log('connecting mqtt client')
// const client = mqtt.connect(host, options)

// client.on('error', function (err) {
//   console.log(err)
//   client.end()
// })

// client.on('connect', function () {
//   console.log('client connected:' + clientId)
//   // console.log("");
//   client.subscribe('device/123output', { qos: 0 },(sub_message)=>{
//       console.log("Message From Server : "+sub_message);
//   })
//   // client.subscribe('topic', { qos: 1 })
//   //client.publish('topic', sendMessage, { qos: 0, retain: false })
// })

// client.on('message', function (topic, message, packet) {
//   console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
//   // console.log("\n"+JSON.stringify(packet))
// })





