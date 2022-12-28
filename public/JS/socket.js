const URL = "/";

// Socket.io Code-->
const socket = io(URL);

// client-side
 socket.on("connection", (data) => {
     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
     console.log(data);

 });


 socket.on("client_status", (data) => {
     console.log(data);
 });
 
 socket.on("disconnect", () => {
     console.log('Socket Disconnected ... ');
 });
