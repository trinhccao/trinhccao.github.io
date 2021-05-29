'use strict';
console.log('JS loaded OK');

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    console.log(this.responseText);
  }
}
xhr.open('GET', './demo.json', true);
xhr.send();