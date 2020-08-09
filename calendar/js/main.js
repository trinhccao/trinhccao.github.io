'use strict';
const days = document.querySelectorAll('.calendar .day');
const prev = document.querySelector('.calendar .btn-prev');
const next = document.querySelector('.calendar .btn-next');
const headerMY = document.querySelector('.calendar .cheader');
const strMonths = [
  'Một',
  'Hai',
  'Ba',
  'Tư',
  'Năm',
  'Sáu',
  'Bảy',
  'Tám',
  'Chín',
  'Mười',
  'Mười một',
  'Mười hai'
];

function fillCalendarData(dateObj) {
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth();
  let day = new Date(year, month).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();
  let date = 0;
  let cellIndex = (day === 0) ? 6 : (day - 1);
  days.forEach((day, index) => {
    day.innerHTML = '';
    day.classList.remove('today');
    if (index < cellIndex || index >= cellIndex + lastDate) return;
    day.innerHTML = ++date;
    if (year === active.y && month === active.m && date === active.d) {
      day.classList.add('today');
    }
  });
  headerMY.innerHTML = `Tháng ${strMonths[month]}, ${year}`;
}

var date = new Date();
var y = date.getFullYear();
var m = date.getMonth();
var d = date.getDate();
var active = {
  y: y,
  m: m,
  d: d
};

prev.addEventListener('click', () => {
  m--;
  if (m < 0) {
    y--;
    m = 11;
  }
  date = new Date(y, m);
  fillCalendarData(date);
});
next.addEventListener('click', () => {
  m++;
  if (m > 11) {
    y++;
    m = 0;
  }
  date = new Date(y, m);
  fillCalendarData(date);
});

fillCalendarData(date);








// fix sticky hover on touch devices
function clearSticky(self) {
  let parent = self.parentElement;
  let next = self.nextSibling;
  parent.removeChild(self);
  setTimeout(() => {
    parent.insertBefore(self, next);
  }, 0);
}
prev.addEventListener('touchend', function() {
  this.onclick = function() {
    clearSticky(this);
  };
});
next.addEventListener('touchend', function () {
  this.onclick = function () {
    clearSticky(this);
  };
});