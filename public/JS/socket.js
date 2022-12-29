const URL = "/";

// Socket.io Code-->
const socket = io(URL);

// client-side
 socket.on("connection", (data) => {
     console.log(socket.id); 
     console.log(data);
 });

 socket.on("subscriver", (data) => {

    let addMessage = `
    <div class="card card-body message-class ">
        <div>
            <div class="d-flex">
                <h5 class="prevent-select">Message: </h5>
                <p style="padding-left: 10px; font-size: 13px;">${data}</p>
            </div>
            <div class="d-flex justify-content-between">
                <div class="d-flex" >
                    <h6 class="prevent-select">Time : </h6>
                    <p class="time">${new Date().toLocaleTimeString([],{hour: '2-digit',minute:'2-digit',hour12:false})}</p>
                </div>
                <div><button type="button" class="btn btn-secondary"  onclick="deleteBox(this)">Delete</button></div>
            </div>
        </div>
    </div>`

    let messageBox = document.createElement("div")
    messageBox.innerHTML = addMessage
    document.getElementById("collapseExample12").appendChild(messageBox); 
});

socket.on("client_status", (data) => {
    console.log(data);
    document.getElementById('isConnect').style.backgroundColor = "red"
});

socket.on("disconnect", () => {
    console.log('Socket Disconnected ... ');
    document.getElementById('isConnect').style.backgroundColor = "red"
});
