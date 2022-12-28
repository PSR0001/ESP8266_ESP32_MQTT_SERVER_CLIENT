const express = require('express')
const path = require('path');
const app = express()
const http = require('http');
const { instrument } = require("@socket.io/admin-ui");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  },
});

const port = process.env.PORT || 3000

app.use(express.json());
// app.use(express.static('public'))
app.use('/', express.static('public'))

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/mqtt_values',(req,res)=>{
  res.send({"status": true})
})

  // Socket listening 
  try {
  
    io.on("connection", (socket) => {
  
      console.log(`User with id: ${socket.id} connected!`);
  
      socket.on("disconnect", () => {
        console.log(`User with id: ${socket.id} disconnected`);
      });
    
  
      // io.emit("Chart-Data",message)
      socket.on("Chart-Data", (data) => {
        // console.log(data);
        
        socket.broadcast.emit("Chart-Data", data);
      });
      socket.on("RGB-Data", (data) => {
        // console.log(data);
        socket.broadcast.emit("RGB-Data", data);
      });
  
    });
  
    //admin-ui
    instrument(io, { auth: false });
  } catch (error) {
    console.log(`Could not start the server, ${error}`);
  }
  