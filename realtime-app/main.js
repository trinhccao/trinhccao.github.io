'use strict';
const heading = document.querySelector('h1');
const socket = io('ws://14.232.232.109:8888');

socket.on('connect', function() {
  heading.textContent = 'Connection is opened';
});

socket.on('error', function() {
  heading.textContent = 'Connection error';
});