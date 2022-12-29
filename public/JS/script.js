function generateClientId() {
    const clientId = 'mqtt_' + Math.random().toString(16).substr(2, 8)
    document.getElementById('client-id2').value = clientId
    document.getElementById('create_connection').disabled = false
}


function submitMqttData() {
   
    let data = {
        'cname': document.getElementById('form3Example1').value,
        'ccolor': document.getElementById('validationCustom04').options[document.getElementById('validationCustom04').selectedIndex].text,
        'chostype': document.getElementById('tcpws').options[document.getElementById('tcpws').selectedIndex].text,
        'cipaddress': document.getElementById('ipaddress').value,
        'cport': document.getElementById('port').value,
        'cclientid': document.getElementById('client-id2').value,
        'cchecked': document.getElementById('flexCheckDefault').value,
        'cusername': document.getElementById('name-client').value,
        'cpassword': document.getElementById('password').value,
    }

    postData('/mqtt_values',data)
    .then((data) => {
        if(data.status === true){
            console.log(data);
            let connect_button = document.getElementById('create_connection')
             document.getElementById('isConnect').style.backgroundColor = "#1ce01c"
            connect_button.textContent = "connected"
            connect_button.style.backgroundColor = "green"
            connect_button.disabled = true;
            socket.emit("client_ready",{"client": true})
        }
     });
}


async function postData(url = '', data = {}) {
  
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data) 
    });
    return response.json(); 
  }
  

// -----------------------MQTT subscribe Code--------------------
function mqttSubscribe(){  
    socket.emit("subcrive", document.getElementById('inputCity2').value)
}
function mqttPublish(){
  let pubData = {
    "topic": document.getElementById('inputCity').value,
    "value": document.getElementById('floatingTextarea2').value
  }
    socket.emit("publish",pubData)
}


function deleteBox(e) {
  e.parentElement.parentElement.parentElement.parentElement.remove()
}

// --------------------------------------------------------------------