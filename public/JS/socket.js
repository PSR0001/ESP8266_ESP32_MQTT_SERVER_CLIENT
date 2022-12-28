const URL = "/";

// Socket.io Code-->
const socket = io(URL);

// client-side
 socket.on("connection", (data) => {
     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
     console.log(data);

 });

//  let Data_Distance;
 //Chart- Data
 socket.on("Chart-Data", (data) => {
    //  console.log(data.distance);
    //  Data_Distance=data;
    // console.log(Data_Distance)
    pushValueChart(data)
 });
 
 socket.on("disconnect", () => {
     console.log('Socket Disconnected ... ');
 });
