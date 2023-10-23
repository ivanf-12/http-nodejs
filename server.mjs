// Create an ES6 module for your server (index.js)

import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

const io = new Server(server);

function generateData() {
  const TEAM_ID = "1009";
  const now = new Date();
  const CLOCK = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  const YAW = (Math.random() * 360 - 180).toFixed(2);
  const PITCH = (Math.random() * 360 - 180).toFixed(2);
  const ROLL = (Math.random() * 360 - 180).toFixed(2);
  const MIN_LAT = -7.763047;
  const MAX_LAT = -7.773691;
  const MIN_LONG = 110.370284;
  const MAX_LONG = 110.38167;
  const GPS_LATITUDE = (Math.random() * (MAX_LAT - MIN_LAT) + MIN_LAT).toFixed(
    6
  );
  const GPS_LONGITUDE = (
    Math.random() * (MAX_LONG - MIN_LONG) +
    MIN_LONG
  ).toFixed(6);
  const VOLTAGE = (Math.random() * 12).toFixed(2);
  const PRESSURE = (Math.random() * 100).toFixed(2);
  const ALTITUDE = (Math.random() * 700).toFixed(2);
  return (
    TEAM_ID +
    "," +
    CLOCK +
    "," +
    YAW +
    "," +
    PITCH +
    "," +
    ROLL +
    "," +
    GPS_LATITUDE +
    "," +
    GPS_LONGITUDE +
    "," +
    VOLTAGE +
    "," +
    PRESSURE +
    "," +
    ALTITUDE +
    ";"
  );
}

function printText(socket) {
  socket.emit("message", generateData());
  setTimeout(() => {
    printText(socket);
  }, 1000);
}

io.on("connection", (socket) => {
  console.log("Connection happened");
  printText(socket);
});

server.listen(port, () => {
  console.log(`Server is running on port`);
});
