'use strict';
const ws = new WebSocket('ws://14.232.232.109:8888');
const heading = document.querySelector('h1');

ws.onopen = function() {
  heading.textContent = 'Connection opened';
}

ws.onerror = function() {
  heading.textContent = 'Connection error';
}